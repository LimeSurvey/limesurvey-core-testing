const { isKeyValuePresent } = require('../support/utils/common')

describe('Survey tests', () => {
  let token, aid
  const numberOfSurveys = 25

  chai.config.truncateThreshold = 0

  before(function () {
    cy.generateAuthToken(
      this.auth['admin'].username,
      this.auth['admin'].password
    ).then((response) => {
      token = response.body
    })

    cy.task('queryDb', 'SELECT MAX(aid) FROM `lime_answers`').then((result) => {
      aid = result[0]['MAX(aid)']
    })
  })

  it('survey list returns all surveys (pageSize=50)', function () {
    cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}rest/v1/survey`,
      qs: {
        pageSize: 50,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.surveys).to.have.lengthOf(numberOfSurveys)
      expect(isKeyValuePresent(response.body, 'surveys.0.sid', 145252)).to.be
        .true
    })
  })

  it('survey list returns second page of surveys (pageSize=10)', function () {
    cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}rest/v1/survey`,
      qs: {
        pageSize: 10,
        page: 2,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.surveys).to.have.lengthOf(10)
      expect(isKeyValuePresent(response.body, 'surveys.0.sid', 582481)).to.be
        .true
    })
  })

  it('survey detail', function () {
    const sid = 857644
    cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(isKeyValuePresent(response.body, 'survey.sid', 857644)).to.be.true
      expect(
        isKeyValuePresent(
          response.body,
          'survey.languageSettings.en.title',
          'Survey question delete'
        )
      ).to.be.true
    })
  })

  it('delete question', function () {
    const sid = 857644

    cy.request({
      method: 'PATCH',
      url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
      body: {
        patch: [
          {
            entity: 'question',
            op: 'delete',
            id: '72',
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.deep.equal({
        operationsApplied: 1,
      })
    })

    // check survey
    cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(
        isKeyValuePresent(
          response.body,
          'survey.questionGroups.0.questions.0.qid',
          72
        )
      ).to.be.false
      expect(
        isKeyValuePresent(
          response.body,
          'survey.questionGroups.0.questions.1.qid'
        )
      ).to.be.false
    })
  })

  it('create answer', function () {
    const sid = 241194

    cy.request({
      method: 'PATCH',
      url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
      body: {
        patch: [
          {
            entity: 'answer',
            op: 'create',
            id: '96', // qid
            props: {
              0: {
                tempId: '0',
                code: 'AO01',
                sortOrder: 0,
                assessmentValue: 0,
                scaleId: 0,
                l10ns: {
                  de: {
                    answer: 'katze',
                    language: 'de',
                  },
                  en: {
                    answer: 'cat',
                    language: 'en',
                  },
                },
              },
              1: {
                tempId: '1',
                code: 'AO02',
                sortOrder: 1,
                assessmentValue: 0,
                scaleId: 0,
                l10ns: {
                  de: {
                    answer: 'hund',
                    language: 'de',
                  },
                  en: {
                    answer: 'dog',
                    language: 'en',
                  },
                },
              },
              2: {
                tempId: '2',
                code: 'AO03',
                sortOrder: 2,
                assessmentValue: 0,
                scaleId: 0,
                l10ns: {
                  de: {
                    answer: 'vogel',
                    language: 'de',
                  },
                  en: {
                    answer: 'bird',
                    language: 'en',
                  },
                },
              },
            },
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.deep.equal({
        operationsApplied: 1,
        tempIdMapping: {
          answersMap: [
            {
              tempId: '0',
              id: aid + 1,
              field: 'aid',
            },
            {
              tempId: '1',
              id: aid + 2,
              field: 'aid',
            },
            {
              tempId: '2',
              id: aid + 3,
              field: 'aid',
            },
          ],
        },
      })
    })

    // check survey
    cy.fixture('responses.json')
      .its('r005')
      .then((json) => {
        cy.request({
          method: 'GET',
          url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(
            isKeyValuePresent(
              response.body,
              'survey.questionGroups.0.questions.0.answers',
              json.answers
            )
          ).to.be.true
        })
      })
  })

  it('create answer deletes not specified answers', function () {
    const sid = 158868

    cy.request({
      method: 'PATCH',
      url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
      body: {
        patch: [
          {
            entity: 'answer',
            op: 'create',
            id: '97', // qid
            props: {
              2: {
                tempId: '2',
                code: 'AO03',
                sortOrder: 2,
                assessmentValue: 0,
                scaleId: 0,
                l10ns: {
                  de: {
                    answer: 'vogel',
                    language: 'de',
                  },
                  en: {
                    answer: 'bird',
                    language: 'en',
                  },
                },
              },
            },
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.deep.equal({
        operationsApplied: 1,
        tempIdMapping: {
          answersMap: [
            {
              tempId: '2',
              id: aid + 4,
              field: 'aid',
            },
          ],
        },
      })
    })

    // check survey
    cy.fixture('responses.json')
      .its('r006')
      .then((json) => {
        cy.request({
          method: 'GET',
          url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(
            isKeyValuePresent(
              response.body,
              'survey.questionGroups.0.questions.0.answers',
              json.answers
            )
          ).to.be.true
        })
      })
  })

  it('update answer', function () {
    const sid = 229791

    cy.request({
      method: 'PATCH',
      url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
      body: {
        patch: [
          {
            entity: 'answer',
            op: 'update',
            id: '98', // qid
            props: {
              0: {
                aid: '47',
                code: 'AO01',
                sortOrder: 0,
                assessmentValue: 0,
                scaleId: 0,
                l10ns: {
                  de: {
                    answer: 'vogel',
                    language: 'de',
                  },
                  en: {
                    answer: 'bird',
                    language: 'en',
                  },
                },
              },
              1: {
                aid: '48',
                code: 'AO02',
                sortOrder: 1,
                assessmentValue: 0,
                scaleId: 0,
                l10ns: {
                  de: {
                    answer: 'hund',
                    language: 'de',
                  },
                  en: {
                    answer: 'dog',
                    language: 'en',
                  },
                },
              },
            },
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.deep.equal({
        operationsApplied: 1,
      })
    })

    // check survey
    cy.fixture('responses.json')
      .its('r007')
      .then((json) => {
        cy.request({
          method: 'GET',
          url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(
            isKeyValuePresent(
              response.body,
              'survey.questionGroups.0.questions.0.answers',
              json.answers
            )
          ).to.be.true
        })
      })
  })

  it('update answer deletes not specified answers', function () {
    const sid = 145252
    cy.request({
      method: 'PATCH',
      url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
      headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
      body: {
        patch: [
          {
            entity: 'answer',
            op: 'update',
            id: '99', // qid
            props: {
              0: {
                aid: '49',
                code: 'AO01',
                sortOrder: 0,
                assessmentValue: 0,
                scaleId: 0,
                l10ns: {
                  de: {
                    answer: 'vogel',
                    language: 'de',
                  },
                  en: {
                    answer: 'bird',
                    language: 'en',
                  },
                },
              },
            },
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.deep.equal({
        operationsApplied: 1,
      })
    })

    // check survey
    cy.fixture('responses.json')
      .its('r008')
      .then((json) => {
        cy.request({
          method: 'GET',
          url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(
            isKeyValuePresent(
              response.body,
              'survey.questionGroups.0.questions.0.answers',
              json.answers
            )
          ).to.be.true
        })
      })
  })
})

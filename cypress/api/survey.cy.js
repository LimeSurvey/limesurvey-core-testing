
// survey data can contain data that changes between requests
// such as dates, sow e must noramlize these values
const normalizeSurvey = function(survey){
  var users = [
    survey?.owner,
    survey?.ownerInherited
  ]
  users.forEach((user) => {
    if (user) {
      user.lastLogin = '2024-02-20 11:22:00'
      user.modified = '2024-02-20 11:22:00'
    }
  })
}

describe('Survey tests', () => {
  let token, aid

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

  it('survey list', function () {
    cy.fixture('responses.json')
      .its('r002')
      .then((json) => {
        cy.request({
          method: 'GET',
          url: `${Cypress.config('baseUrl')}rest/v1/survey`,
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.deep.equal(json)
        })
      })
  })

  it('survey detail', function () {
    cy.fixture('responses.json')
      .its('r003')
      .then((json) => {
        cy.request({
          method: 'GET',
          url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/857644`,
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(
            normalizeSurvey(json.survey)
          ).to.deep.equal(
            normalizeSurvey(response.survey)
          )
        })
      })
  })

  it('delete question', function () {
    cy.request({
      method: 'PATCH',
      url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/857644`,
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
        erronousOperations: [],
      })
    })

    // check survey
    cy.fixture('responses.json')
      .its('r004')
      .then((json) => {
        cy.request({
          method: 'GET',
          url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/857644`,
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(
            normalizeSurvey(json.survey)
          ).to.deep.equal(
            normalizeSurvey(response.survey)
          )
        })
      })
  })

  it('create answer', function () {
    cy.request({
      method: 'PATCH',
      url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/241194`,
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
        erronousOperations: [],
      })
    })

    // check survey
    cy.fixture('responses.json')
      .its('r005')
      .then((json) => {
        cy.request({
          method: 'GET',
          url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/241194`,
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.deep.equal(json)
        })
      })
  })

  it('create answer deletes not specified answers', function () {
    cy.request({
      method: 'PATCH',
      url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/158868`,
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
        answersMap: [
          {
            tempId: '2',
            id: aid + 4,
            field: 'aid',
          },
        ],
        erronousOperations: [],
      })
    })

    // check survey
    cy.fixture('responses.json')
      .its('r006')
      .then((json) => {
        cy.request({
          method: 'GET',
          url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/158868`,
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body).to.deep.equal(json)
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
        erronousOperations: [],
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
          expect(response.body).to.deep.equal(json)
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
        erronousOperations: [],
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
          expect(response.body).to.deep.equal(json)
        })
      })
  })
})

const { isKeyValuePresent } = require('../support/utils/common')

// array represents these permissions
// [create, view/read, update, delete]
/*
const user_permissions = {
  perm1: {
    surveys: [0, 1, 0, 0],
  },
  perm2: {
    surveys: [0, 0, 1, 0],
  },
  perm3: {
    surveys: [0, 0, 0, 1],
  },
  perm4: {
    surveys: [0, 0, 0, 0],
  },
  perm5: {
    surveys: [0, 0, 1, 1],
  },
  perm6: {
    surveys: [0, 1, 0, 1],
  },
  perm7: {
    surveys: [0, 1, 1, 0],
  },
  perm8: {
    surveys: [0, 1, 1, 1],
  },
  perm9: {
    surveys: [1, 0, 0, 0],
  },
  perm10: {
    surveys: [1, 0, 0, 1],
  },
  perm11: {
    surveys: [1, 0, 1, 0],
  },
  perm12: {
    surveys: [1, 0, 1, 1],
  },
  perm13: {
    surveys: [1, 1, 0, 0],
  },
  perm14: {
    surveys: [1, 1, 0, 1],
  },
  perm15: {
    surveys: [1, 1, 1, 0],
  },
  perm16: {
    surveys: [1, 1, 1, 1],
  },
}
*/

const expected_outcome = {
  //      0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18
  perm1: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  perm2: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  perm3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  perm4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  perm5: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  perm6: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  perm7: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  perm8: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  perm9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  perm10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  perm11: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  perm12: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  perm13: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  perm14: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  perm15: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  perm16: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
}

describe('Permissions tests', () => {
  let token

  let users = [
    'perm1',
    'perm2',
    'perm3',
    'perm4',
    'perm5',
    'perm6',
    'perm7',
    'perm8',
    'perm9',
    'perm10',
    'perm11',
    'perm12',
    'perm13',
    'perm14',
    'perm15',
    'perm16',
  ]

  chai.config.truncateThreshold = 0

  users.forEach((user, idx) => {
    it(`create auth token - user:${user}`, function () {
      cy.generateAuthToken(user, 'Password123!').then((response) => {
        token = response.body
      })
    })
    // 0
    it(`survey detail - user:${user}`, function () {
      const sid = 145252
      cy.request({
        method: 'GET',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(expected_outcome[user][0] ? 200 : 401)
        if (expected_outcome[user][0]) {
          expect(isKeyValuePresent(response.body, 'survey.sid', sid)).to.be.true
          expect(
            isKeyValuePresent(
              response.body,
              'survey.languageSettings.en.title',
              'Updateanswer2'
            )
          ).to.be.true
        }
      })
    })
    // 1
    it(`update answer - user:${user}`, function () {
      const sid = '333577'
      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'answer',
              op: 'update',
              id: '100', // qid
              props: {
                0: {
                  aid: '51',
                  code: 'AO01',
                  l10ns: {
                    en: {
                      answer: user,
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
        if (expected_outcome[user][1]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Access denied',
                entity: 'answer',
                id: '100',
                op: 'update',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 2
    it(`create answer - user:${user}`, function () {
      const sid = '536749'
      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'answer',
              op: 'create',
              id: '102', // qid
              props: {
                0: {
                  aid: '52',
                  code: 'AO02',
                  l10ns: {
                    en: {
                      answer: user,
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
        if (expected_outcome[user][2]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Access denied',
                entity: 'answer',
                id: '102',
                op: 'create',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 3
    it(`delete answer - user:${user}`, function () {
      const sid = '284882'
      // answer ids are 80-95
      const aid = (80 + idx).toString()
      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'answer',
              op: 'delete',
              id: aid,
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        if (expected_outcome[user][3]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Access denied',
                entity: 'answer',
                id: aid,
                op: 'delete',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 4
    it(`language settings update - user:${user}`, function () {
      const sid = '864172'
      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'languageSetting',
              op: 'update',
              id: null,
              props: {
                de: {
                  title: `${user}-de`,
                },
                en: {
                  title: `${user}-en`,
                },
              },
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        if (expected_outcome[user][4]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Permission denied',
                entity: 'languageSetting',
                id: null,
                op: 'update',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 5
    it(`question attribute update - user:${user}`, function () {
      const sid = '268122'
      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'questionAttribute',
              op: 'update',
              id: 105,
              props: {
                dualscale_headerA: {
                  en: `${user}-A`,
                },
                dualscale_headerB: {
                  en: `${user}-B`,
                },
              },
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        if (expected_outcome[user][5]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Access denied',
                entity: 'questionAttribute',
                id: '105',
                op: 'update',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 6
    it(`question create - user:${user}`, function () {
      const sid = '244138'
      const title = `QE${idx}`
      let qid

      cy.task('queryDb', 'SELECT MAX(qid) FROM `lime_questions`').then(
        (result) => {
          qid = result[0]['MAX(qid)']
        }
      )

      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'question',
              op: 'create',
              props: {
                question: {
                  title: title,
                  type: 'S',
                  question_theme_name: 'shortfreetext',
                  gid: '46',
                  tempId: 'XXX321',
                },
                questionL10n: {
                  en: {
                    question: 'Short free text',
                    help: 'Help text',
                  },
                },
              },
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        if (expected_outcome[user][6]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
            tempIdMapping: {
              questionsMap: [
                {
                  tempId: 'XXX321',
                  id: qid + 1,
                  field: 'qid',
                },
              ],
            },
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Access denied',
                entity: 'question',
                id: null,
                op: 'create',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 7
    it(`question delete - user:${user}`, function () {
      const sid = '651994'
      // question ids are 109-124
      const qid = (109 + idx).toString()

      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'question',
              op: 'delete',
              id: qid,
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        if (expected_outcome[user][7]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Access denied',
                entity: 'question',
                id: qid,
                op: 'delete',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 8
    it(`question group update - user:${user}`, function () {
      const sid = '472956'

      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'questionGroup',
              op: 'update',
              id: 48,
              props: {
                questionGroup: {
                  randomizationGroup: user,
                  gRelevance: '',
                },
                questionGroupL10n: {
                  en: {
                    groupName: `${user} - group`,
                    description: `${user} - description`,
                  },
                },
              },
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        if (expected_outcome[user][8]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Permission denied',
                entity: 'questionGroup',
                id: '48',
                op: 'update',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 9
    it(`question group create - user:${user}`, function () {
      const sid = '265249'
      let gid

      cy.task('queryDb', 'SELECT MAX(gid) FROM `lime_groups`').then(
        (result) => {
          gid = result[0]['MAX(gid)']
        }
      )

      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'questionGroup',
              op: 'create',
              props: {
                questionGroup: {
                  tempId: 777,
                  randomizationGroup: '',
                  gRelevance: '',
                },
                questionGroupL10n: {
                  en: {
                    groupName: `${user} - group`,
                    description: `${user} - description`,
                  },
                },
              },
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        if (expected_outcome[user][9]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
            tempIdMapping: {
              questionGroupsMap: [
                {
                  tempId: 777,
                  id: gid + 1,
                  field: 'gid',
                },
              ],
            },
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Permission denied',
                entity: 'questionGroup',
                id: null,
                op: 'create',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 10
    it(`question group delete - user:${user}`, function () {
      const sid = '514699'
      // question group ids are 50-65
      const gid = (50 + idx).toString()

      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'questionGroup',
              op: 'delete',
              id: gid,
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        if (expected_outcome[user][10]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Access denied',
                entity: 'questionGroup',
                id: gid,
                op: 'delete',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 11
    it(`question group L10n update - user:${user}`, function () {
      const sid = '984629'

      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'questionGroupL10n',
              op: 'update',
              id: 66,
              props: {
                en: {
                  groupName: `${user} - group EN`,
                  description: `${user} - description EN`,
                },
                de: {
                  groupName: `${user} - group DE`,
                  description: `${user} - description DE`,
                },
              },
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        if (expected_outcome[user][11]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Permission denied',
                entity: 'questionGroupL10n',
                id: '66',
                op: 'update',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 12
    it(`question group reorder - user:${user}`, function () {
      const sid = '444656'

      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'questionGroupReorder',
              op: 'update',
              id: 123456,
              props: {
                67: {
                  // question group id
                  sortOrder: 2,
                  questions: {
                    130: {
                      // question id
                      sortOrder: 0,
                    },
                    129: {
                      // question id
                      sortOrder: 1,
                    },
                  },
                },
                68: {
                  sortOrder: 1,
                  questions: {
                    131: {
                      sortOrder: 3,
                    },
                    132: {
                      sortOrder: 2,
                    },
                  },
                },
              },
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        if (expected_outcome[user][12]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Permission denied',
                entity: 'questionGroupReorder',
                id: '123456',
                op: 'update',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 13
    it(`question L10n update - user:${user}`, function () {
      const sid = '737522'
      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'questionL10n',
              op: 'update',
              id: 133,
              props: {
                en: {
                  question: `${user} - question EN`,
                  help: `${user} - help EN`,
                },
                de: {
                  question: `${user} - question DE`,
                  help: `${user} - help DE`,
                },
              },
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        if (expected_outcome[user][13]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Access denied',
                entity: 'questionL10n',
                id: '133',
                op: 'update',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 14
    it(`question update - user:${user}`, function () {
      const sid = '152113'
      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'question',
              op: 'update',
              id: 134,
              props: {
                title: user,
                mandatory: true,
                encrypted: true,
              },
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        if (expected_outcome[user][14]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Access denied',
                entity: 'question',
                id: '134',
                op: 'update',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 15
    it(`subquestion update - user:${user}`, function () {
      const sid = '498131'
      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'subquestion',
              op: 'update',
              id: 135,
              props: {
                0: {
                  qid: 136,
                  title: `SQ${idx}`,
                  l10ns: {
                    en: {
                      question: `${user}A`,
                      language: 'en',
                    },
                  },
                },
                1: {
                  qid: 137,
                  title: `SQ${idx + 1}`,
                  l10ns: {
                    en: {
                      question: `${user}B`,
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
        if (expected_outcome[user][15]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Access denied',
                entity: 'subquestion',
                id: '135',
                op: 'update',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 16
    it(`subquestion create - user:${user}`, function () {
      const sid = '347455'
      let qid

      cy.task('queryDb', 'SELECT MAX(qid) FROM `lime_questions`').then(
        (result) => {
          qid = result[0]['MAX(qid)']
        }
      )

      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'subquestion',
              op: 'create',
              id: 138,
              props: {
                0: {
                  title: `SQ${idx}`,
                  tempId: '123',
                  l10ns: {
                    en: {
                      question: `${user}A`,
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
        if (expected_outcome[user][16]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
            tempIdMapping: {
              subquestionsMap: [
                {
                  tempId: '123',
                  id: qid + 1,
                  field: 'qid',
                },
              ],
            },
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Access denied',
                entity: 'subquestion',
                id: '138',
                op: 'create',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 17
    it(`subquestion delete - user:${user}`, function () {
      const sid = '565868'
      // subquestion ids are 141-156
      const qid = (141 + idx).toString()

      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'subquestion',
              op: 'delete',
              id: qid,
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        if (expected_outcome[user][17]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Access denied',
                entity: 'subquestion',
                id: qid,
                op: 'delete',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
    // 18
    it(`survey update - user:${user}`, function () {
      const sid = '125919'
      cy.request({
        method: 'PATCH',
        url: `${Cypress.config('baseUrl')}rest/v1/survey-detail/${sid}`,
        headers: {
          Authorization: `Bearer ${token}`,
          accept: 'application/json',
        },
        failOnStatusCode: false,
        body: {
          patch: [
            {
              entity: 'survey',
              op: 'update',
              props: {
                anonymized: false,
                language: 'en',
                additionalLanguages: ['de'],
                expires: '2124-03-20 13:28:00',
                template: 'fruity_twentythree',
                format: 'G',
              },
            },
          ],
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        if (expected_outcome[user][14]) {
          expect(response.body).to.deep.equal({
            operationsApplied: 1,
          })
        } else {
          expect(response.body).to.deep.equal({
            operationsApplied: 0,
            exceptionErrors: [
              {
                error: 'Permission denied',
                entity: 'survey',
                id: null,
                op: 'update',
                context: {
                  id: sid,
                },
              },
            ],
          })
        }
      })
    })
  })
})

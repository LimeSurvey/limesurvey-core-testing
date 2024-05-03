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
  //      0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16
  perm1: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  perm2: [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  perm3: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}

describe('Permissions tests', () => {
  let token

  let users = ['perm1', 'perm2', 'perm3']

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
  })
})

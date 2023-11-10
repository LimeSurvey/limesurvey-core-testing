describe('Survey tests', () => {
  let token

  it('survey list', function () {
    cy.fixture('responses.json')
      .its('r002')
      .then((json) => {
        cy.generateAuthToken(
          this.auth['admin'].username,
          this.auth['admin'].password
        ).then((response) => {
          token = response.body
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
          expect(response.body).to.deep.equal(json)
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
            id: '73',
          },
        ],
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.equal(true)
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
          expect(response.body).to.deep.equal(json)
        })
      })
  })
})

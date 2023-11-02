describe('api tests', () => {
  it('generate new authentication token', function () {
    cy.generateAuthToken(
      this.auth['admin'].username,
      this.auth['admin'].password
    ).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.a('string')
      cy.exec(
        `echo '{"admin": "${response.body}"}' > cypress/fixtures/token.json`
      )
    })
  })

  it('survey list', function () {
    cy.fixture('token.json').then((e) => {
      cy.request({
        method: 'GET',
        url: `${Cypress.config('baseUrl')}rest/v1/survey`,
        headers: {
          Authorization: `Bearer ${e.admin}`,
          accept: 'application/json',
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.surveys[0].sid).to.eq(954472)
      })
    })
  })
})

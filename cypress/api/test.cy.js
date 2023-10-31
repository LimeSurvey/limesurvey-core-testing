describe('api tests', () => {
  let token

  it('generate new authentication token', function () {
    cy.generateAuthToken(
      this.auth['admin'].username,
      this.auth['admin'].password
    ).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.a('string')
      token = response.body
    })
  })

  it('survey list', function () {
    cy.request({
      method: 'GET',
      url: `${Cypress.config('baseUrl')}rest/v1/survey`,
      headers: {
        authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.surveys[0].sid).to.eq(954472)
    })
  })
})

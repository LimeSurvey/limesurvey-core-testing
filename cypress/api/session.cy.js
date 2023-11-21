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

  it('destory currently used authenticaion token', function () {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.config('baseUrl')}rest/v1/session`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.eq('OK')
    })

    cy.task(
      'queryDb',
      'SELECT * FROM `lime_sessions` WHERE id="' + token + '"'
    ).then((count) => {
      cy.log('SELECT * FROM `lime_sessions` WHERE id="' + token + '"')
      expect(count).to.have.lengthOf(0)
    })
  })

  it('can not generate new authentication token with invalid credentials', function () {
    cy.fixture('responses.json')
      .its('r001')
      .then((json) => {
        cy.request({
          method: 'POST',
          url: `${Cypress.config('baseUrl')}rest/v1/session`,
          failOnStatusCode: false,
          body: {
            username: 'foo',
            password: 'bar',
          },
        }).then((response) => {
          expect(response.status).to.eq(401)
          expect(response.body).to.deep.equal(json)
        })
      })
  })
})

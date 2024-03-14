describe('Test', () => {
  const qeBaseUrl = 'http://ls-ce:3000/'

  it('user can access new question editor', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      '/admin'
    )

    cy.visit(
      `${Cypress.config('baseUrl')}EditorLink?url=${encodeURIComponent(
        `${qeBaseUrl}#/`
      )}&route=survey/691384`
    )

    cy.origin(qeBaseUrl, () => {
      cy.wait(10000)
      cy.get('.logo').should('be.visible')
    })
  })
})

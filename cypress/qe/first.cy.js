describe('Test', () => {
  const qeBaseUrl = `${Cypress.config('baseUrl')}:3000`.replace('/:', ':')

  it('user can access new question editor', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      '/admin'
    )

    cy.visit(`${Cypress.config('baseUrl')}EditorLink?noRedirect=1`)
    cy.visit(`${qeBaseUrl}/#/survey/691384`)
    cy.wait(3000)
    cy.get('.logo').should('be.visible')
  })
})

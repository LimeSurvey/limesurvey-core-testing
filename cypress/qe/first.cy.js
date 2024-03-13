describe('Test', () => {
  const qeBaseUrl = `${Cypress.config('baseUrl')}:3000`.replace('/index.php/:', ':')

  it('user can access new question editor', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      '/admin'
    )

    cy.visit(
      `${Cypress.config('baseUrl')}EditorLink?url=${encodeURIComponent(
        `${qeBaseUrl}/#/survey/691384`
      )}`
    )
    cy.wait(3000)
    cy.get('.logo').should('be.visible')
  })
})

describe('Test', () => {
  // 'http://localhost/index.php/'
  const qeBaseUrl = `${Cypress.config('baseUrl')}`.replace(
    '/index.php/',
    ':3000/'
  )

  it('user can access new question editor', function () {
    cy.log(qeBaseUrl)
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
    cy.wait(3000)
    cy.get('.logo').should('be.visible')
  })
})
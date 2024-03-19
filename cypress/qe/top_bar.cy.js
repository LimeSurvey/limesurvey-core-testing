describe('Top bar', () => {
  const qeBaseUrl = `http://${Cypress.env('REACT_APP_DOMAIN')}:3000/`

  it('Logo links to application', function () {
    cy.getQESurvey(
      this.auth['admin'].username,
      this.auth['admin'].password,
      qeBaseUrl,
      951785
    )

    cy.origin(qeBaseUrl, () => {
      cy.get('.logo').click()
      // need to check where exactly should I be redirected
      cy.url().should('contain', Cypress.config('baseUrl'))
    })
  })

  it('User can open Question Type Flyout and it is rendered correctly', function () {
    cy.getQESurvey(
      this.auth['admin'].username,
      this.auth['admin'].password,
      qeBaseUrl,
      951785
    )

    cy.origin(qeBaseUrl, () => {
      cy.get('.top-bar .add-question-button').click()
      cy.get('.question-type-selector').should('be.visible')
      cy.get('.question-type-selector').within(() => {
        cy.get('[data-testid="question-type-search"]').should('be.visible')
        cy.get('[data-testid*="Rating"]').should('be.visible')
      })
    })
  })

  it.skip('User can rename survey', function () {
    cy.getQESurvey(
      this.auth['admin'].username,
      this.auth['admin'].password,
      qeBaseUrl,
      951785
    )

    cy.origin(qeBaseUrl, () => {
      cy.get('.survey-title-content-editor > .content-editable')
        .clear()
        .type('New survey title')
      // wait for saving and check that the title change persisted
    })
  })
})

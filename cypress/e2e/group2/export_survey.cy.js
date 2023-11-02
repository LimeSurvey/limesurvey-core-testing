describe('Export survey', () => {
  it('user can export survey structure (lss)', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&surveyid=841748'
    )

    cy.get('button').contains('Export').click()
    cy.get('#selector__exportTypeSelector-modal').should('be.visible')
    cy.get('[data-selector="surveystructure"]').click()
    cy.get('#selector__exportTypeSelector-detailPage')
      .should('be.visible')
      .and(
        'contain',
        'This export will dump all the groups, questions, answers and conditions for your survey into a .LSS file'
      )
    cy.get('#selector__select-this-exportTypeSelector').click()
    cy.readFile(
      `${Cypress.config('downloadsFolder')}/limesurvey_survey_841748.lss`
    )
  })

  it('user can export survey archive (lsa)', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&surveyid=841748'
    )

    cy.get('button').contains('Export').click()
    cy.get('#selector__exportTypeSelector-modal').should('be.visible')
    cy.get('[data-selector="surveyarchive"]').click()
    cy.get('#selector__exportTypeSelector-detailPage')
      .should('be.visible')
      .and(
        'contain',
        'This export is intended to create a complete backup of an active survey for archival purposes.'
      )
    cy.get('#selector__select-this-exportTypeSelector').click()
    cy.readFile(
      `${Cypress.config('downloadsFolder')}/survey_archive_841748.lsa`
    )
  })
})

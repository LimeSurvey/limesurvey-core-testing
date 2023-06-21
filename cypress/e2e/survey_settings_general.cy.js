describe('Survey settings - General settings', () => {
  it.only('user can add languages', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=generalsettings&surveyid=942815'
    )

    cy.get('ul.select2-selection__rendered').click({ force: true })
    cy.get('.select2-search__field').type('German{enter}')
    cy.get('ul.select2-selection__rendered').click({ force: true })
    cy.get('.select2-search__field').type('French{enter}')
    cy.get('#save-button').click()
    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
    //check overview page
    cy.visit('surveyAdministration/view&surveyid=942815')
    cy.get('.card-title')
      .contains('Share survey')
      .parents('.card.card-primary')
      .within(() => {
        cy.get('.card-title')
          .contains('Share survey')
          .parents('.card.card-primary')
          .within(() => {
            cy.get('ul.list-group li')
              .eq(2)
              .within(() => {
                cy.get('.card-label').should('contain', 'French:')
                cy.get('a').should(
                  'have.attr',
                  'href',
                  `${Cypress.config('baseUrl')}survey/index&sid=942815&lang=fr`
                )
              })
          })
        cy.get('ul.list-group li')
          .eq(3)
          .within(() => {
            cy.get('.card-label').should('contain', 'German:')
            cy.get('a').should(
              'have.attr',
              'href',
              `${Cypress.config('baseUrl')}survey/index&sid=942815&lang=de`
            )
          })
      })
  })

  it('user can remove language', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=generalsettings&surveyid=942815'
    )
  })
})

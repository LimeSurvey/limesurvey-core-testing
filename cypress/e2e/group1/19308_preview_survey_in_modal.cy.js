describe('19308 Preview survey in modal', () => {
  it('preview should be read-only and not have a Next or Submit button', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'survey/index&sid=841748&newtest=Y&lang=en&popuppreview=true'
    )

    // check that I can see all groups and questions
    cy.get('#group-0').should('contain', 'Favorite Colors')
    cy.get('#question3').should(
      'contain',
      'What colors are your favorite? Pick at least two.'
    )
    cy.get('#group-1').should('contain', 'Colors in pictures')
    cy.get('#question28').should('contain', 'Which image do you like better?')

    // check that elements (nav bar, progress bar, next and submit) don't exist
    cy.get('#survey-nav').should('not.exist')
    cy.get('.progress-bar').should('not.exist')
    cy.get('button[value="movenext"]').should('not.exist')
    cy.get('button[value="movesubmit"]').should('not.exist')
  })
})

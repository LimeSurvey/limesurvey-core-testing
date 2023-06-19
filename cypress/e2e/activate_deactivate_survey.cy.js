describe('Activate/deactivate survey', () => {
  it('user can activate survey - open access', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&surveyid=127873'
    )

    cy.get('#ls-activate-survey').click()
    //check that all options are off per default
    cy.get('#anonymized_2').should('be.checked')
    cy.get('#ipaddr_2').should('be.checked')
    cy.get('#savetimings_2').should('be.checked')
    cy.get('#datestamp_2').should('be.checked')
    cy.get('#ipanonymize_2').should('be.checked')
    cy.get('#refurl_2').should('be.checked')
    // we are in open access mode
    cy.get('#openAccessMode_1').should('be.checked')
    // activate survey
    cy.get('#saveactivateBtn').click()
    // check success message is present
    cy.get('h5.card-title')
      .contains(
        'Congrats! Your survey has been activated successfully in open-access mode'
      )
      .should('be.visible')
    // check that you can run the survey
    cy.get('#execute_survey_button').invoke('removeAttr', 'target').click()
    cy.get('.survey-name')
      .contains('Activate open access survey')
      .should('be.visible')
  })

  it('user can activate survey - closed access', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&surveyid=232684'
    )

    cy.get('#ls-activate-survey').click()
    // check that the modal content loaded
    cy.get('label[for="anonymized_1"]').should('be.visible')
    // there is no going back to closed access
    cy.get('#openAccessMode_1').should('not.exist')
    // activate survey
    cy.get('#saveactivateBtn').click()
    // land on survey participants page
    cy.url().should(
      'include',
      'admin/tokens/sa/index&surveyid=232684&surveyActivationFeedback=surveyActivationFeedback'
    )
    // check that you can run the survey
    cy.visit('survey/index&sid=232684&newtest=Y&lang=en')
    cy.get('#token').type('123')
    cy.get('button[type=submit]').click()
    cy.get('.survey-name')
      .contains('Activate closed access survey')
      .should('be.visible')
  })

  it.skip('user can deactivate survey - open access', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&surveyid=124686'
    )
  })

  it.skip('user can deactivate survey - closed access', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&surveyid=841736'
    )
  })
})

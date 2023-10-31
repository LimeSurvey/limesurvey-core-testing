describe('Activate/deactivate survey', () => {
  it('user can activate survey - open access', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view?iSurveyID=127873'
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
      'surveyAdministration/view?iSurveyID=232684'
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
    cy.get('button[value="continue"]').click()
    cy.get('.survey-name')
      .contains('Activate closed access survey')
      .should('be.visible')
  })

  it('user can deactivate survey - open access', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view?iSurveyID=124686'
    )

    cy.get('[name="stop-survey"]').click()
    // check that both options are available
    cy.get('[value="Expire survey"]').should('be.visible')
    cy.get('.card-primary')
      .eq(1)
      .find('b')
      .eq(1)
      .invoke('text')
      .then((text) => {
        let textArray = text.trim().split('_')
        cy.get('[value="Deactivate survey"]').click()
        // check the feedback and table name
        cy.contains('Your survey (124686) was deactivated.').should(
          'be.visible'
        )
        cy.contains(textArray.slice(0, textArray.length - 1).join('_')).should(
          'be.visible'
        )
        cy.get('a').contains('Close').click()
        cy.get('#ls-activate-survey').should('be.visible')
      })
  })

  it('user can deactivate survey - closed access', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view?iSurveyID=841736'
    )

    cy.get('[name="stop-survey"]').click()
    cy.get('.card-primary')
      .eq(1)
      .find('b')
      .eq(1)
      .invoke('text')
      .then((text) => {
        let textArray = text.trim().split('_')
        cy.get('[value="Deactivate survey"]').click()
        // check the feedback and table name
        cy.contains('Your survey (841736) was deactivated.').should(
          'be.visible'
        )
        cy.contains(textArray.slice(0, textArray.length - 1).join('_')).should(
          'be.visible'
        )
        cy.contains(
          textArray
            .slice(0, textArray.length - 1)
            .join('_')
            .replace('survey', 'tokens')
        ).should('be.visible')
        cy.get('a').contains('Close').click()
        cy.get('#ls-activate-survey').should('be.visible')
      })
  })

  it('user can activate deactivated survey - closed access', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view?iSurveyID=177311'
    )

    cy.get('#ls-activate-survey').click()
    // check that the modal content loaded
    cy.get('label[for="anonymized_1"]').should('be.visible')
    // you can choose between open and closed access
    cy.get('label[for="openAccessMode_1"]').should('be.visible')
    cy.get('label[for="openAccessMode_2"]').click()
    // activate survey
    cy.get('#saveactivateBtn').click()
    // option to restore old survey participants table
    cy.get('[name="oldtable"]').select(0)
    cy.get('[value="Restore"]').click()
    cy.contains(
      'A survey participants table has been created for this survey'
    ).should('be.visible')
    cy.visit('admin/tokens/sa/index/surveyid/177311')
    cy.contains('some.guy@survey.it').should('be.visible')
  })
})

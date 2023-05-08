describe('Survey creation', () => {
  it('user can create a simple survey', function () {
    cy.intercept(
      'POST',
      `${Cypress.config('baseUrl')}surveyAdministration/insert`,
      cy.spy().as('insertRequestSpy')
    ).as('insertRequest')

    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      '/surveyAdministration/newSurvey'
    )

    const survey_title = 'Simple one question survey'
    // create survey
    cy.get('input[name="surveyls_title"]').type(survey_title)
    cy.get('#create-survey-submit').click()
    cy.wait('@insertRequest').then((response) => {
      const url = response.response.body.redirecturl
      cy.wrap(url.match(/surveyid=([0-9]*)/)[1]).as('surveyId')
    })
    // check feedback and that the survey administration page rendered
    cy.get('.alert.alert-info.alert-dismissible')
      .should('be.visible')
      .and(
        'contain',
        'Your new survey was created. We also created a first question group and an example question for you.'
      )
    cy.get('#adminsidepanel__sidebar--selectorCreateQuestion').should(
      'be.visible'
    )
    // check that the survey was really created
    cy.get('[href="/index.php?r=surveyAdministration/listsurveys"]')
      .contains('Surveys')
      .click()
    cy.get('@surveyId').then((id) => {
      cy.contains(id).closest('tr').should('contain', survey_title)
    })
  })

  it('user can import survey (structure only)', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      '/surveyAdministration/newSurvey'
    )

    const survey_id = '727741'
    const survey_title = 'Date and time'

    cy.get('[data-form-id="importsurvey"]').click()
    cy.get('input[type=file]').selectFile('cypress/surveys/date_and_time.lss')
    cy.get('#translinksfields').should('be.checked') // default state
    cy.get('#import-submit').click()

    cy.url().should('include', 'surveyAdministration/copy')
    // TODO: Add this back in once https://github.com/cypress-io/cypress/issues/23772 is resolved
    // cy.get('input').contains('Go to survey').click()
    // cy.url().should('include',`questionAdministration/view&surveyid=${survey_id}`)

    // check that the survey was really created
    cy.get('[href="/index.php?r=surveyAdministration/listsurveys"]')
      .contains('Surveys')
      .click()
    cy.contains(survey_id).closest('tr').should('contain', survey_title)
  })
})

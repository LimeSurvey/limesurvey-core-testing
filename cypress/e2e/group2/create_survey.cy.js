const { getSurveyIdFromUrl } = require('../../support/utils/common')
const files = ['colors.lss', 'colors.lsa', 'colors.txt']

describe('Survey creation', function () {
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
    cy.get('[href="/index.php/surveyAdministration/listsurveys"]')
      .contains('Surveys')
      .click()
    cy.get('@surveyId').then((id) => {
      cy.contains(id).closest('tr').should('contain', survey_title)
    })
  })

  files.forEach((file) => {
    it(`user can import survey ${file} - convert resource links enabled`, function () {
      cy.loginByCSRF(
        this.auth['admin'].username,
        this.auth['admin'].password,
        '/surveyAdministration/newSurvey'
      )

      const survey_title = 'Colors'
      let survey_id = ''
      const question_attributes = file == 'colors.txt' ? 51 : 129
      const themes = file == 'colors.txt' ? 0 : 1

      cy.get('[data-form-id="importsurvey"]').click()
      cy.get('input[type=file]').selectFile(`cypress/data/surveys/${file}`)
      cy.get('#translinksfields').should('be.checked') // default state
      cy.get('#import-submit').click()

      cy.url().should('include', 'surveyAdministration/copy')
      cy.checkImportSummary('table', {
        surveys: 1,
        languages: 1,
        question_groups: 2,
        questions: 4,
        question_attributes,
        answers: 2,
        subquestions: 11,
        default_answers: 0,
        assessments: 0,
        quotas: 1,
        quota_members: 2,
        quota_language_settings: 1,
        themes,
      })
      cy.get('input[type="submit"]')
        .invoke('attr', 'onclick')
        .then((c) => {
          survey_id = getSurveyIdFromUrl(c)

          // TODO: Add this back in once https://github.com/cypress-io/cypress/issues/23772 is resolved
          // cy.get('input').contains('Go to survey').click()
          // cy.url().should('include',`questionAdministration/view&surveyid=${survey_id}`)

          // check that the survey was really created
          cy.get('[href="/index.php/surveyAdministration/listsurveys"]')
            .contains('Surveys')
            .click()
          cy.contains(survey_id).closest('tr').should('contain', survey_title)
        })

      // after this has been fixed https://bugs.limesurvey.org/view.php?id=18701
      // we should check that the resource links have been translated
    })
  })

  // after this has been fixed https://bugs.limesurvey.org/view.php?id=18700
  // write same as previous test, but with translate links disabled

  it('user can copy survey; convert resource links enabled', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      '/surveyAdministration/newSurvey'
    )

    const survey_title = 'Colors Copy1'
    let survey_id = '12345'

    cy.get('[data-form-id="copysurveyform"]').click()
    cy.get('#select2-copysurveylist-container').click()
    cy.get('input[type="search"]').type('color{enter}')
    cy.get('input#copysurveyname').type(survey_title)
    cy.get('input#copysurveyid').type(survey_id)

    cy.get('#copysurveytranslinksfields').should('be.checked') // default state
    cy.get('input[type="submit"]').contains('Copy survey').click()

    cy.url().should('include', 'surveyAdministration/copy')
    cy.checkImportSummary('table', {
      surveys: 1,
      languages: 1,
      question_groups: 2,
      questions: 4,
      question_attributes: 129,
      answers: 2,
      subquestions: 11,
      default_answers: 0,
      assessments: 0,
      quotas: 1,
      quota_members: 2,
      quota_language_settings: 1,
      themes: 1,
    })

    cy.get('[href="/index.php/surveyAdministration/listsurveys"]')
      .contains('Surveys')
      .click()
    cy.contains(survey_id).closest('tr').should('contain', survey_title)
  })

  it('user can copy survey; select all exclude and reset options', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      '/surveyAdministration/newSurvey'
    )

    const survey_title = 'Colors Copy2'
    let survey_id = '12346'

    cy.get('[data-form-id="copysurveyform"]').click()
    cy.get('#select2-copysurveylist-container').click()
    cy.get('input[type="search"]').type('color{enter}')
    cy.get('input#copysurveyname').type(survey_title)
    cy.get('input#copysurveyid').type(survey_id)

    cy.get('#copysurveyexcludequotas').click()
    cy.get('#copysurveyexcludepermissions').click()
    cy.get('#copysurveyexcludeanswers').click()
    cy.get('#copysurveyresetconditions').click()
    cy.get('#copysurveyresetstartenddate').click()
    cy.get('#copysurveyresetresponsestartid').click()
    cy.get('input[type="submit"]').contains('Copy survey').click()

    cy.url().should('include', 'surveyAdministration/copy')
    cy.checkImportSummary('table', {
      surveys: 1,
      languages: 1,
      question_groups: 2,
      questions: 4,
      question_attributes: 129,
      answers: 0,
      subquestions: 11,
      default_answers: 0,
      assessments: 0,
      quotas: 0,
      quota_members: 0,
      quota_language_settings: 0,
      themes: 1,
    })

    cy.get('[href="/index.php/surveyAdministration/listsurveys"]')
      .contains('Surveys')
      .click()
    cy.contains(survey_id).closest('tr').should('contain', survey_title)
  })
})

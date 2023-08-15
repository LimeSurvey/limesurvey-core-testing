const { getIframeBody } = require('../../support/utils/common')

describe('Survey settings - Text elements', () => {
  it('user can change survey title for individual language', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=surveytexts&surveyid=691384'
    )

    cy.get('a.nav-link').contains('Croatian').click()
    cy.get('#short_title_hr').clear()
    cy.get('#short_title_hr').type('Anketa: textualni elementi')
    cy.get('#save-button').click()
    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
    // check the survey
    cy.visit('survey/index&sid=691384&newtest=Y&lang=hr')
    cy.get('.survey-name.large-heading').should(
      'contain',
      'Anketa: textualni elementi'
    )

    // is it changed for english?
    cy.visit('survey/index&sid=691384&newtest=Y&lang=en')
    cy.get('.survey-name.large-heading').should(
      'contain',
      'Survey Text Elements'
    )
  })

  it('user can change date format for individual language', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=surveytexts&surveyid=691384'
    )

    cy.get('#dateformat_en').select('dd/mm/yyyy')
    cy.get('#save-button').click()
    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
    // check the survey
    cy.visit('survey/index&sid=691384&newtest=Y&lang=en')
    cy.get('.survey-welcome').then(($e) => {
      cy.log($e.text())
    })
    cy.get('.survey-welcome').should('contain', '21/06/2033')

    // is it changed for croatian?
    cy.visit('survey/index&sid=691384&newtest=Y&lang=hr')
    cy.get('.survey-welcome').should('contain', '21.6.2033')
  })

  it('user can change decimal mark', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=surveytexts&surveyid=691384'
    )

    // change it to comma
    cy.get('label[for="numberformat_en_2"]').click()
    cy.get('#save-button').click()
    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
    // check the survey
    cy.visit('survey/index&sid=691384&newtest=Y&lang=en')
    cy.get('button[value="movenext"]').click()
    cy.get('#answer691384X18X46').type('12.345{enter}')
    cy.get('button[value="movenext"]').click()
    cy.get('.group-title').contains('Second group').should('be.visible')
    cy.get('button[value="moveprev"]').click()
    cy.get('input[value="12,345"]').should('be.visible')
  })

  it('user can change alias for individual language', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=surveytexts&surveyid=691384'
    )

    cy.get('a.nav-link').contains('Croatian').click()
    cy.get('#alias_hr').clear()
    cy.get('#alias_hr').type('alias-hr')
    cy.get('#save-button').click()
    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
    // check url
    cy.visit(`${Cypress.config('baseUrl')}alias-hr`)
    cy.get('.survey-welcome').should('contain', '21.6.2033')
  })

  it('user can change description and welcome message', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=surveytexts&surveyid=691384'
    )

    getIframeBody('iframe[title="Editor, description_en"]')
      .clear()
      .type('test_description')
    getIframeBody('iframe[title="Editor, welcome_en"]')
      .clear()
      .type('test_welcome. Survey expires: {EXPIRY}', {
        parseSpecialCharSequences: false,
      })
    cy.get('#save-button').click()
    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
    // check survey
    cy.visit('survey/index&sid=691384&newtest=Y&lang=en')
    cy.get('.survey-description').should('contain', 'test_description')
    cy.get('.survey-welcome').should('contain', 'test_welcome')
  })

  it('user can change end message, end url and its description', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=surveytexts&surveyid=691384'
    )

    getIframeBody('iframe[title="Editor, endtext_en"]')
      .clear()
      .type('test_end_text')
    cy.get('#url_en').clear()
    cy.get('#url_en').type('http://www.test.ing')
    cy.get('#urldescrip_en').clear()
    cy.get('#urldescrip_en').type('Go to test.ing')
    cy.get('#save-button').click()
    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
    // check survey
    cy.visit('survey/index&sid=691384&newtest=Y&lang=en')
    cy.get('button[value="movenext"]').click()
    cy.get('#answer691384X18X46').should('be.visible')
    cy.get('button[value="movenext"]').click()
    cy.get('.group-title').contains('Second group').should('be.visible')
    cy.get('button[value="movesubmit"]').click()
    cy.get('.completed-text').should('contain', 'test_end_text')
    cy.get('a[href="http://www.test.ing"]')
      .contains('Go to test.ing')
      .should('be.visible')
  })
})

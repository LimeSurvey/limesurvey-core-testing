const { getIframeBody } = require('../../support/utils/common')

describe('Survey settings - Privacy policy', () => {
  it('user can edit privacy policy label for individual language', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=datasecurity&surveyid=571743'
    )

    cy.get('#dataseclabel_en').type('CustomPP-Eng')
    cy.get('#save-button').click()
    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')

    // it should not be changed for croatian
    cy.get('button.nav-link').contains('Croatian').click()
    cy.get('#dataseclabel_hr').should('have.value', 'CustomPP-Cro')

    // check the survey
    cy.visit('survey/index&sid=571743&newtest=Y&lang=en')
    cy.get('label[for="datasecurity_accepted"]').should(
      'contain',
      'CustomPP-Eng'
    )
  })

  it('user can edit privacy policy message for individual language', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=datasecurity&surveyid=571743'
    )

    getIframeBody('iframe[title="Editor, datasec_en"]').type(
      'privacy policy message test'
    )
    cy.get('#save-button').click()

    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')

    // check the survey
    cy.visit('survey/index&sid=571743&newtest=Y&lang=en')
    cy.get('#datasecurity_notice').should(
      'contain',
      'privacy policy message test'
    )

    // it should not be changed for croatian
    cy.visit('survey/index&sid=571743&newtest=Y&lang=hr')
    cy.get('#datasecurity_notice').should(
      'contain',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    )
  })

  it('user can edit privacy policy error message for individual language', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=datasecurity&surveyid=571743'
    )

    getIframeBody('iframe[title="Editor, datasecerror_en"]').type(
      'privacy policy error test'
    )
    cy.screenshot()
    cy.get('#save-button').click()

    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
    cy.screenshot()

    // check the survey
    cy.visit('survey/index&sid=571743&newtest=Y&lang=en')
    cy.get('[value="movenext"]').click()
    cy.get('#datasecurity_error')
      .should('be.visible')
      .and('contain', 'privacy policy error test')

    // it should not be changed for croatian
    cy.visit('survey/index&sid=571743&newtest=Y&lang=hr')
    cy.get('[value="movenext"]').click()
    cy.get('#datasecurity_error')
      .should('be.visible')
      .and(
        'contain',
        'Maecenas eros mauris, dictum sit amet dictum quis, interdum a nisi.'
      )
  })
})

const { getIframeBody } = require('../../support/utils/common')

describe('Survey question groups', () => {
  it('user can export question group', function () {
    cy.intercept({ resourceType: 'xhr' }).as('xhrRequests')

    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&surveyid=219315'
    )

    cy.get('#adminsidepanel__sidebar--selectorStructureButton').click()
    cy.wait('@xhrRequests')

    cy.get('.questiongroup-list-group > li').eq(2).click()
    cy.wait('@xhrRequests')

    cy.get('#adminsidepanel__sidebar--selectorStructureButton').click()
    cy.get('.questiongroup-list-group > li')
      .eq(2)
      .find('#dropdownMenuButton1')
      .click()
    // this is a workaround for an issue described here
    // https://github.com/cypress-io/cypress/issues/14857
    cy.window()
      .document()
      .then(function (doc) {
        doc.addEventListener('click', () => {
          setTimeout(function () {
            doc.location.reload()
          }, 5000)
        })
        cy.get('a[href$="admin/export/sa/group/surveyid/219315/gid/24"]')
          .should('be.visible')
          .click()
      })
    cy.readFile(`${Cypress.config('downloadsFolder')}/limesurvey_group_24.lsg`)
  })

  it('user can import question group', function () {
    cy.intercept({ resourceType: 'xhr' }).as('xhrRequests')

    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&surveyid=582481'
    )

    cy.get('#adminsidepanel__sidebar--selectorStructureButton').click()
    cy.wait('@xhrRequests')

    cy.get('#adminsidepanel__sidebar--selectorCreateQuestionGroup').click()
    cy.get('#import-group').click()
    cy.get('input[type=file]').selectFile(
      'cypress/data/surveys/limesurvey_group_24.lsg'
    )
    cy.get('#save-button').click()
    cy.wait('@xhrRequests')

    cy.get('span.alert-header')
      .contains('Question group import is complete.')
      .should('be.visible')
    cy.get('a').contains('Go to question group').click()
    // check group summary
    cy.get('#groupdetails').within(() => {
      cy.get('.row').eq(0).should('contain', 'Third group')
      cy.get('.row').eq(1).should('contain', 'some example description')
      cy.get('.row')
        .eq(2)
        .should('contain', 'G02Q02')
        .and('contain', '==')
        .and('contain', '1')
      cy.get('.row').eq(3).should('contain', 'rand1')
    })
    // check that it is rendered in the survey structure
    cy.get('.questiongroup-list-group > li')
      .eq(2)
      .should('contain', 'Third group')
  })

  it('user can reorder question groups of inactive survey', function () {
    cy.intercept({ resourceType: 'xhr' }).as('xhrRequests')

    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&surveyid=278371'
    )

    cy.intercept(
      'POST',
      `${Cypress.config(
        'baseUrl'
      )}questionGroupsAdministration/updateOrder&surveyid=278371`,
      cy.spy().as('updateSurveySpy')
    ).as('updateSurvey')

    cy.get('#adminsidepanel__sidebar--selectorStructureButton').click()
    cy.wait(500)
    cy.wait('@xhrRequests')
    cy.wait(3000)

    cy.get('.questiongroup-list-group > li:nth(1)').should(
      'contain',
      'Second group'
    )
    cy.get('.questiongroup-list-group > li:nth(2)').should(
      'contain',
      'Third group'
    )

    // switch second and third group
    cy.dragAndDrop(
      '.questiongroup-list-group > li:nth(1) .dragPointer',
      '.questiongroup-list-group > li:nth(2)'
    )
    cy.wait('@xhrRequests')
    cy.wait(3000)

    cy.wait('@updateSurvey').should((xhr) => {
      expect(xhr.response.statusCode, 'successful POST').to.equal(200)
    })
    cy.wait('@xhrRequests')
    cy.wait(3000)

    cy.get('.questiongroup-list-group > li:nth(1)').should(
      'contain',
      'Third group'
    )
    cy.get('.questiongroup-list-group > li:nth(2)').should(
      'contain',
      'Second group'
    )
  })

  it('user can edit question group fields', function () {
    cy.intercept({ resourceType: 'xhr' }).as('xhrRequests')

    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'questionGroupsAdministration/view&surveyid=422915&gid=30'
    )

    // edit english question group fields
    cy.get('#edit-button').click()
    cy.wait(3000)

    getIframeBody('iframe[title="Editor, description_en"]').type(
      'english description'
    )
    cy.get('#randomization_group').type('rand1')
    cy.get('#grelevance').clear()
    cy.get('#grelevance').type('2')
    cy.get('#save-button').click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    // switch to croatian tab
    cy.get('a.nav-link').contains('Croatian').click()
    cy.get('#group_name_hr').clear()
    cy.get('#group_name_hr').type('Moja prva grupa')
    getIframeBody('iframe[title="Editor, description_hr"]').type(
      'hrvatski opis'
    )
    cy.get('#randomization_group').clear()
    cy.get('#randomization_group').type('rand2')
    cy.get('#grelevance').clear()
    cy.get('#grelevance').type('3')
    cy.get('#save-button').click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    // check that english persisted and randomization group & condition are same
    // for both groups
    cy.get('a.nav-link').contains('English').click()
    cy.get('#group_name_en').should('have.value', 'My first question group')
    getIframeBody('iframe[title="Editor, description_en"]').should(
      'contain',
      'english description'
    )
    cy.get('#randomization_group').should('have.value', 'rand2')
    cy.get('#grelevance').should('contain', '3')
  })
})

const { getIframeBody } = require('../../support/utils/common')

describe('Survey questions', () => {
  it('user can add a question to a specific group', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&iSurveyID=951785'
    )

    const questionText = 'How much do you like dogs?'

    cy.get('#adminsidepanel__sidebar--selectorStructureButton').click()
    cy.get(
      'a[href$="questionGroupsAdministration/view&surveyid=951785&gid=35"]'
    ).click()
    cy.get('#groupdetails').within(() => {
      cy.get('.row').eq(0).should('contain', 'Second group')
    })
    cy.get('#adminsidepanel__sidebar--selectorCreateQuestion').click()
    cy.get('#selector__questionTypeSelector--buttonText').click()
    cy.get('#selector__questionTypeSelector-modal').should('be.visible')
    cy.get('#selector__questionTypeSelector-modal').within(() => {
      cy.get('button[href="#collapsible_single_choice_questions"]').click()
      // select 5 point choice
      cy.get('a[data-key="5"]').click()
      // check the preview
      cy.get('img[src="/assets/images/screenshots/5.png"]')
        .should('be.visible')
        .and(($img) => {
          expect($img[0].naturalWidth).to.be.greaterThan(0)
        })
      cy.get('#selector__select-this-questionTypeSelector').click()
    })
    cy.get('#selector__questionTypeSelector--buttonText').should(
      'contain',
      '5 point choice'
    )
    getIframeBody('iframe[title="Editor, question_en"]').type(questionText)
    cy.get('#save-button-create-question').click()
    cy.get('li.list-group-item')
      .contains('Second group')
      .parents('li')
      .find('li.list-group-item')
      .eq(1)
      .should('contain', '[G02Q03]')
      .and('contain', questionText)
  })

  it('user can delete a question', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&iSurveyID=857644'
    )

    cy.get('#adminsidepanel__sidebar--selectorStructureButton').click()
    cy.get('.questiongroup-list-group').click()
    cy.get('.questiongroup-list-group .question-question-list-item')
      .eq(1)
      .click()
    cy.get('.questiongroup-list-group .question-question-list-item')
      .eq(1)
      .find('#dropdownMenuButton1')
      .click()
    cy.get('a[data-btntext="Delete"]').eq(1).click()
    cy.get('#confirmation-modal').within(() => {
      cy.get('#actionBtn').click()
    })
    cy.get('li.list-group-item').contains('[G01Q02]').should('not.exist')
    cy.get('li.list-group-item')
      .contains('My first question group')
      .parents('li')
      .find('li.list-group-item')
      .should('have.length', 1)
  })
})

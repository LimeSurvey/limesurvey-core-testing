const { getIframeBody } = require('../../support/utils/common')

describe('Survey questions', () => {
  it('user can add a question to a specific group', function () {
    cy.intercept({ resourceType: 'xhr' }).as('xhrRequests')

    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&iSurveyID=951785'
    )

    const questionText = 'How much do you like dogs?'

    cy.get('#adminsidepanel__sidebar--selectorStructureButton').click()
    cy.wait('@xhrRequests')

    cy.get(
      'a[href$="questionGroupsAdministration/view&surveyid=951785&gid=35"]'
    ).click()
    cy.wait('@xhrRequests')

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
    cy.wait('@xhrRequests')
    cy.wait(3000)

    cy.get('li.list-group-item')
      .contains('Second group')
      .parents('li')
      .find('li.list-group-item')
      .eq(1)
      .should('contain', '[G02Q03]')
      .and('contain', questionText)
  })

  it('user can delete a question', function () {
    cy.intercept({ resourceType: 'xhr' }).as('xhrRequests')

    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&iSurveyID=857644'
    )

    cy.get('#adminsidepanel__sidebar--selectorStructureButton').click()
    cy.wait('@xhrRequests')

    cy.get('.questiongroup-list-group').click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    cy.get('.questiongroup-list-group .question-question-list-item')
      .eq(1)
      .click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    cy.get('.questiongroup-list-group .question-question-list-item')
      .eq(1)
      .find('#dropdownMenuButton1')
      .click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    cy.get('a[data-btntext="Delete"]').eq(1).click()
    cy.get('#confirmation-modal').within(() => {
      cy.get('#actionBtn').click()
    })
    cy.wait('@xhrRequests')
    cy.wait(3000)

    cy.get('li.list-group-item').contains('[G01Q02]').should('not.exist')
    cy.get('li.list-group-item')
      .contains('My first question group')
      .parents('li')
      .find('li.list-group-item')
      .should('have.length', 1)
  })

  it('user can set question as mandatory', function () {
    cy.intercept({ resourceType: 'xhr' }).as('xhrRequests')

    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&iSurveyID=348447'
    )

    cy.get('#adminsidepanel__sidebar--selectorStructureButton').click()
    cy.wait('@xhrRequests')

    cy.get('.questiongroup-list-group').click()
    cy.wait('@xhrRequests')

    cy.get('.questiongroup-list-group .question-question-list-item')
      .eq(1)
      .click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    cy.get('#questionEditorButton').click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    cy.get('label[for="question[mandatory]_Y"]').click()
    cy.get('#save-button-create-question').click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    // check notification
    cy.get('.alert.alert-success.alert-dismissible').should('be.visible')
    cy.get('label[for="question[mandatory]_Y"]')
      .parent()
      .find('input')
      .should('be.checked')
    cy.get('.questiongroup-list-group .question-question-list-item')
      .eq(1)
      .click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    // check question summary
    cy.get('#question-overview').within(() => {
      cy.get('.row').eq(5).should('contain', 'Mandatory').and('contain', 'Yes')
    })
  })

  it('user can edit offered answers', function () {
    cy.intercept({ resourceType: 'xhr' }).as('xhrRequests')

    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&iSurveyID=348447'
    )

    const newAnswer = 'Parrot'

    cy.get('#adminsidepanel__sidebar--selectorStructureButton').click()
    cy.wait('@xhrRequests')

    cy.get('.questiongroup-list-group').click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    cy.get('.questiongroup-list-group .question-question-list-item')
      .eq(2)
      .click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    cy.get('#questionEditorButton').click()
    cy.get('.answeroption-text input').eq(2).clear().type(newAnswer)
    cy.get('#save-button-create-question').click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    // check notification
    cy.get('.alert.alert-success.alert-dismissible').should('be.visible')
    cy.get('.answeroption-text input').eq(2).should('have.value', newAnswer)
  })

  it('user can choose to show -Other- option to multiple choice question and set custom label', function () {
    cy.intercept({ resourceType: 'xhr' }).as('xhrRequests')

    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view&iSurveyID=348447'
    )

    const customLabel = 'Years worked'

    cy.get('#adminsidepanel__sidebar--selectorStructureButton').click()
    cy.wait('@xhrRequests')

    cy.get('.questiongroup-list-group').click()
    cy.get('.questiongroup-list-group .question-question-list-item')
      .eq(3)
      .click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    cy.get('#questionEditorButton').click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    cy.get('label[for="question[other]_Y"]').click()
    // expand display
    cy.get('#button-collapse-Display').click()
    cy.get('#advancedSettings_display_other_replace_text_en').type(customLabel)
    cy.get('#save-button-create-question').click()
    cy.wait('@xhrRequests')
    cy.wait(3000)

    // check notification
    cy.get('.alert.alert-success.alert-dismissible').should('be.visible')
    cy.get('label[for="question[other]_Y"]')
      .parent()
      .find('input')
      .should('be.checked')
    cy.get('#advancedSettings_display_other_replace_text_en').should(
      'have.value',
      customLabel
    )
  })
})

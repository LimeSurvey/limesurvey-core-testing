describe('Reorder survey', () => {
  it('user can collapse/expand all groups', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'questionAdministration/listQuestions&surveyid=947781'
    )

    cy.get('[href="#reorder"]').click()
    //all groups should be expanded by default
    cy.get('ol.group-list').within(() => {
      cy.contains('First question').should('be.visible')
      cy.contains('Fourth question').should('be.visible')

      //close first group
      cy.get('.ri-arrow-down-s-fill').eq(0).click()
      cy.contains('First question').should('not.be.visible')

      //expand first group
      cy.get('.ri-arrow-down-s-fill').eq(0).click()
      cy.contains('First question').should('be.visible')
    })

    //close all
    cy.get('#organizer-collapse-all').click()
    cy.get('ol.group-list').within(() => {
      cy.contains('First question').should('not.be.visible')
      cy.contains('Fourth question').should('not.be.visible')
    })

    //expand all
    cy.get('#organizer-expand-all').click()
    cy.get('ol.group-list').within(() => {
      cy.contains('First question').should('be.visible')
      cy.contains('Fourth question').should('be.visible')
    })
  })

  it('user can reorder groups and questions', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'questionAdministration/listQuestions&surveyid=947781'
    )

    cy.get('[href="#reorder"]').click()
    // reorder groups
    cy.dragAndDrop('ol.group-list', '.ui-sortable-handle', 4, 0)
    // reorder questions inside group
    cy.dragAndDrop('ol.group-list', '.ui-sortable-handle', 5, 4)
    // put question from one group into the other
    cy.dragAndDrop('ol.group-list', '.ui-sortable-handle', 4, 1, 60)
    cy.get('#btnSave').click()

    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and(
        'contain',
        'The new question group/question order was successfully saved.'
      )

    // check the order
    cy.get('#adminsidepanel__sidebar--selectorStructureButton').click()
    cy.get('ul.questiongroup-list-group > li')
      .eq(0)
      .should('contain', 'Second group')
      .click()
    cy.wait(1000)
    cy.get('ul.question-question-list')
      .eq(0)
      .within(() => {
        cy.get('li').eq(0).should('contain', 'Fourth question')
        cy.get('li').eq(1).should('contain', 'First question')
        cy.get('li').eq(2).should('contain', 'Fifth question')
      })
    cy.get('ul.questiongroup-list-group > li')
      .eq(1)
      .should('contain', 'My first question group')
      .click()
    cy.wait(1000)
    cy.get('ul.question-question-list')
      .eq(1)
      .within(() => {
        cy.get('li').eq(0).should('contain', 'A first example question')
        cy.get('li').eq(1).should('contain', 'Second question')
      })
    cy.get('ul.questiongroup-list-group > li')
      .eq(2)
      .should('contain', 'Third group')
  })
})

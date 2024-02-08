describe('Subquestion codes', () => {
  it('user can rename subquestion codes and successfully save the changes #19108', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'questionAdministration/view&surveyid=954472&gid=36&qid=87'
    )

    cy.get('#questionEditorButton').click()
    cy.get('#subquestions\\[88\\]\\[0\\]\\[code\\]').clear().type('Y04')
    cy.get('#subquestions\\[92\\]\\[0\\]\\[code\\]').click()
    cy.get('.alert.alert-danger.alert-dismissible')
      .should('be.visible')
      .and(
        'contain',
        'Error: You are trying to use duplicate subquestion codes.'
      )
    cy.get('#subquestions\\[92\\]\\[0\\]\\[code\\]').clear().type('Y01')
    cy.get('#save-button-create-question').click()
    cy.wait(500)
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Question saved')

    // check the survey
    cy.visit('survey/index/action/previewquestion/sid/954472/gid/36/qid/87')
    cy.get('tbody td:first input').should(
      'have.id',
      'answer954472X36X87Y04_X01'
    )
    cy.get('#answertext954472X36X87Y04').should('contain', 'one')
  })
})

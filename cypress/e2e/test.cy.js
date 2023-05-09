describe('Test DB Connection', () => {
  it('query the db', function () {
    cy.task('queryDb', 'SELECT * FROM `lime_users` WHERE 1').then((count) => {
      expect(count).to.have.lengthOf(1)
    })
  })

  it('upload dir images are accessible', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'survey/index/action/previewquestion/sid/841748/gid/4/qid/28'
    )

    cy.get('img').should('be.visible')
    .and(($img) => {
      expect($img[0].naturalWidth).to.be.greaterThan(0)
    })
    cy.screenshot({capture: 'runner'})
  })
})

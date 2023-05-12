describe('Ranking question', () => {
    it('user can rank items', function () {
      cy.loginByCSRF(
        this.auth['admin'].username,
        this.auth['admin'].password,
        'survey/index/action/previewquestion/sid/282638/gid/8/qid/35'
      )

      cy.wait(1000)
      cy.get('[data-value="AO03"]').drag('.sortable-rank')
      cy.get('[data-value="AO01"]').drag('.sortable-rank')
      cy.get('[data-value="AO02"]').drag('.sortable-rank')
    })
})
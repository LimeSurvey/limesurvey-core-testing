describe('Test DB Connection', () => {
  it('query the db', function () {
    cy.task('queryDb', 'SELECT * FROM `lime_users` WHERE 1').then((count) => {
      expect(count).to.have.lengthOf(1)
    })
  })
})

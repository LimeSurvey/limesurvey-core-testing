describe('Login', () => {
  it('user can log in with valid credentials', function () {
    cy.visit('admin')
    cy.login(this.auth['admin'].username, this.auth['admin'].password)
    cy.get(
      'a.dropdown-item[href="/index.php?r=admin/authentication/sa/logout"]'
    ).should('exist')
  })

  it('user can not log in with invalid credentials', function () {
    cy.visit('admin')
    // user enters wrong password
    cy.login(this.auth['admin'].username, 'wrongpass')
    // check that logout is not available
    cy.get(
      'a.dropdown-item[href="/index.php?r=admin/authentication/sa/logout"]'
    ).should('not.exist')
    // user gets feedback
    cy.get('#notif-container > .alert.alert-danger')
      .should('be.visible')
      .and('contain', 'Incorrect username and/or password!')
  })

  it('user can log out', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      '/admin'
    )

    cy.get('a').contains('admin').click()
    cy.get(
      'a.dropdown-item[href="/index.php?r=admin/authentication/sa/logout"]'
    ).click()
    cy.get('input#user').should('be.visible')
  })

  it('400 status without a valid CSRF token', function () {
    cy.request({
      method: 'POST',
      url: `${Cypress.config('baseUrl')}admin/authentication/sa/login`,
      failOnStatusCode: false,
      form: true,
      body: {
        user: this.auth['admin'].username,
        password: this.auth['admin'].password,
        YII_CSRF_TOKEN: 'invalid-csrf-token',
        authMethod: 'Authdb',
        loginlang: 'default',
        action: 'login',
        width: Cypress.config('viewportWidth'),
        login_submit: 'login',
      },
    })
      .its('status')
      .should('eq', 400)
  })
})

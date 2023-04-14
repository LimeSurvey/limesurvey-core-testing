Cypress.Commands.add('login', (username, password) => {
  cy.get('#user').type(username)
  cy.get('#password').type(password)
  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('loginByCSRF', (user, password, path, lang = 'en') => {
  cy.request(`${Cypress.config('baseUrl')}admin/authentication/sa/login`)
    .its('body')
    .then((body) => {
      const csrfToken = Cypress.$(body).find('input[name=YII_CSRF_TOKEN]').val()

      cy.request({
        method: 'POST',
        url: `${Cypress.config('baseUrl')}admin/authentication/sa/login`,
        failOnStatusCode: false,
        form: true,
        body: {
          user,
          password,
          YII_CSRF_TOKEN: csrfToken,
          authMethod: 'Authdb',
          loginlang: lang,
          action: 'login',
          width: Cypress.config('viewportWidth'),
          login_submit: 'login',
        },
      })

      cy.visit(path)
    })
})

const { toCapitalizedStr } = require('./utils/common')

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

Cypress.Commands.add('checkImportSummary', (table_selector, json) => {
  cy.get(table_selector).within(() => {
    for (let a in json) {
      cy.contains(`${toCapitalizedStr(a)}:`)
        .siblings('td')
        .eq(0)
        .should('have.text', json[a])
    }
  })
})

Cypress.Commands.add(
  'dragAndDrop',
  (
    parentSelector,
    subjectSelector,
    subjectIndex,
    targetIndex,
    targetSelector = subjectSelector
  ) => {
    cy.get(targetSelector)
      .eq(targetIndex)
      .then((target) => {
        let rect = target[0].getBoundingClientRect()
        cy.get(parentSelector).within(() => {
          cy.get(subjectSelector) // eslint-disable-line cypress/unsafe-to-chain-command
            .eq(subjectIndex)
            .trigger('mousedown', { which: 1 })
            .trigger('mousemove', { pageX: rect.left, pageY: rect.top })
            .trigger('mouseup', { which: 1, force: true })
        })
      })
    cy.wait(500)
  }
)

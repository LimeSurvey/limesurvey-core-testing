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
  'reorder',
  (parentSelector, subjectSelector, targetSelector) => {
    cy.get('[href="#reorder"]').click()
    cy.get('#loader-sidemenuLoaderWidget').should('not.exist')
    cy.get(parentSelector).within(() => {
      cy.contains(targetSelector)
        .then(($el) => $el[0].getBoundingClientRect())
        .then((rect) => {
          cy.contains(subjectSelector) // eslint-disable-line cypress/unsafe-to-chain-command
            .trigger('mousedown', { which: 1 })
            .trigger('mousemove', { pageX: rect.left, pageY: rect.top })
            .then(() => {
              cy.wait(500)
              cy.get('.ui-sortable-placeholder').should('be.visible')
            })
            .trigger('mouseup', { which: 1, force: true })
        })
    })
    cy.wait(500)
    cy.get('#btnSave').click()
  }
)

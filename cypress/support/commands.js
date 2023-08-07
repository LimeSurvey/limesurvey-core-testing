const { toCapitalizedStr } = require('./utils/common')
require('@4tw/cypress-drag-drop')

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
  (subjectSelector, targetSelector, position = 0, r = 5) => {
    cy.get('[href="#reorder"]').click()
    cy.get('#loader-sidemenuLoaderWidget').should('not.exist')
    cy.recursionLoop(() => {
      if (!Cypress.$('.ui-sortable li').eq(position).is(subjectSelector)) {
        cy.get(`${targetSelector} > div`)
          .then(($el) => $el[0].getBoundingClientRect())
          .then((rect) => {
            cy.get(`${subjectSelector} > div`) // eslint-disable-line cypress/unsafe-to-chain-command
              .trigger('mousedown', { which: 1 })
              .trigger('mousemove', {
                which: 1,
                pageX: rect.left,
                pageY: rect.top - r,
              })
              .trigger('mouseup', { which: 1, force: true })
          })
          .then(() => {
            r = r - 5
            cy.wait(300)
          })
        return Cypress.$('.ui-sortable li').eq(position).is(subjectSelector)
      }
    })
    cy.wait(300)
  }
)

Cypress.Commands.add(
  'recursionLoop',
  { times: 'optional' },
  function (fn, times) {
    if (typeof times === 'undefined') {
      times = 0
    }

    cy.then(() => {
      const result = fn(++times)
      if (result === false) {
        cy.recursionLoop(fn, times)
      }
    })
  }
)

Cypress.Commands.add('dragAndDrop', (subjectSelector, targetSelector) => {
  cy.get(subjectSelector).trigger('dragstart')

  cy.get(targetSelector) // eslint-disable-line cypress/unsafe-to-chain-command
    .trigger('dragenter')
    .trigger('dragover')
    .trigger('drop')
  cy.get(subjectSelector).trigger('dragend')
})

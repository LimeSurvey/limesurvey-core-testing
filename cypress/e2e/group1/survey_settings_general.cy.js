describe('Survey settings - General settings', () => {
  it('user can add languages', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=generalsettings&surveyid=148569'
    )

    cy.get('ul.select2-selection__rendered').click()
    cy.get('.select2-search__field').type('German{enter}')
    cy.get('ul.select2-selection__rendered').click()
    cy.get('.select2-search__field').type('French{enter}')
    cy.get('#save-button').click()
    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
    //check overview page
    cy.visit('surveyAdministration/view&surveyid=148569')
    cy.get('.card-title')
      .contains('Share survey')
      .parents('.card.card-primary')
      .within(() => {
        cy.get('.card-title')
          .contains('Share survey')
          .parents('.card.card-primary')
          .within(() => {
            cy.get('ul.list-group li')
              .eq(2)
              .within(() => {
                cy.get('.card-label').should('contain', 'French:')
                cy.get('a').should(
                  'have.attr',
                  'href',
                  `${Cypress.config('baseUrl')}survey/index&sid=148569&lang=fr`
                )
              })
          })
        cy.get('ul.list-group li')
          .eq(3)
          .within(() => {
            cy.get('.card-label').should('contain', 'German:')
            cy.get('a').should(
              'have.attr',
              'href',
              `${Cypress.config('baseUrl')}survey/index&sid=148569&lang=de`
            )
          })
      })
  })

  it('user can not remove default language', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=generalsettings&surveyid=148569'
    )

    cy.get('li[title=English] > button').click()
    cy.wait(500)
    cy.get('.modal-dialog')
      .contains('Are you sure, you want to delete this language?')
      .should('not.exist')
    // TODO: better test when issue CR-1243 gets fixed
  })

  it('user can remove non default language', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=generalsettings&surveyid=148569'
    )

    cy.get('li[title=Croatian] > button').click()
    cy.get('.modal-dialog')
      .contains('Are you sure, you want to delete this language?')
      .should('be.visible')
    cy.wait(1000)
    cy.get('#identity__bsconfirmModal_button_ok').click()
    cy.get('li[title=Croatian]').should('not.exist')
  })

  it('user can change survey owner', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=generalsettings&surveyid=148569'
    )

    cy.get('#owner_id').select('johnw - John Wick', { force: true })
    cy.get('#save-button').click()
    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
    cy.visit(
      'surveyAdministration%2Flistsurveys&Survey%5Bsearched_value%5D=148569&active=&gsid=&yt0=Search'
    )
    cy.get('button[data-bs-target="#survey-column-filter-modal"]').click()
    cy.get('.modal-body').should('be.visible')
    cy.get('input[value="owner"]').check()
    cy.get('#survey-column-filter-modal-submit').click()
    cy.get('.modal-body').should('not.be.visible')
    cy.get('tr').contains('Survey General').parents('tr').contains('johnw')
  })

  it('user can change survey group', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=generalsettings&surveyid=148569'
    )

    cy.get('#gsid').select('Survey settings', { force: true })
    cy.get('#save-button').click()
    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
    cy.visit(
      'surveyAdministration%2Flistsurveys&Survey%5Bsearched_value%5D=148569&active=&gsid=&yt0=Search'
    )
    cy.get('button[data-bs-target="#survey-column-filter-modal"]').click()
    cy.get('.modal-body').should('be.visible')
    cy.get('input[value="group"]').check()
    cy.get('#survey-column-filter-modal-submit').click()
    cy.get('.modal-body').should('not.be.visible')
    cy.get('tr')
      .contains('Survey General')
      .parents('tr')
      .contains('Survey settings')
  })

  it('user can change survey format', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=generalsettings&surveyid=148569'
    )

    // check all in one
    cy.get('input[name="format"][value="A"]').check({ force: true })
    cy.get('#save-button').click()
    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
    cy.visit('survey/index&sid=148569&newtest=Y&lang=en')
    // all questions are visible
    cy.get('#question43').should('be.visible')
    cy.get('#question44').should('be.visible')
    cy.get('#question45').should('be.visible')

    cy.visit(
      'surveyAdministration/rendersidemenulink&subaction=generalsettings&surveyid=148569'
    )
    // check question by question
    cy.get('input[name="format"][value="S"]').check({ force: true })
    cy.get('#save-button').click()
    // wait on notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
    cy.visit('survey/index&sid=148569&newtest=Y&lang=en')
    // go through the survey
    cy.get('button[value="movenext"]').click()
    cy.get('#question43').should('be.visible')
    cy.get('button[value="movenext"]').click()
    cy.get('#question45').should('be.visible')
    cy.get('button[value="movenext"]').click()
    cy.get('#question44').should('be.visible')
  })

  it('user can change survey theme', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=generalsettings&surveyid=148569'
    )

    cy.get('#template').select('vanilla', { force: true })
    // preview should change
    cy.get('#preview-image-container').within(() => {
      cy.get('img[src="/themes/survey/vanilla/files/preview.png"]').should(
        'be.visible'
      )
    })
    cy.get('#save-button').click()
    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
    // check survey theme
    cy.visit('survey/index&sid=148569&newtest=Y&lang=en')
    cy.get('.btn-primary')
      .eq(0)
      .should('have.css', 'background-color', 'rgb(13, 110, 253)')
  })

  // improve when CR-1253 gets fixed
  it('user can change administrator, admin email, and bounce email', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/rendersidemenulink&subaction=generalsettings&surveyid=148569'
    )

    cy.get('input[name="adminbutton"][value="N"]').check({ force: true })
    cy.get('input#admin').type('HomerSimpson')
    cy.get('input[name="adminemailbutton"][value="N"]').check({ force: true })
    cy.get('input#adminemail').type('homer.simpson@email.us')
    cy.get('input[name="bounce_emailbutton"][value="N"]').check({ force: true })
    cy.get('input#bounce_email').type('homer.simpson@email.us.not')
    cy.get('#save-button').click()
    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Survey settings were successfully saved.')
  })
})

const { format, addDays, subDays } = require('date-fns')

describe('User management', () => {
  it('create user with permissions', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'userManagement/index'
    )

    const username = 'testuser1'
    const fullname = 'Test User 1'
    const email = 'testuser1@example.com'
    const password = 'Password123!'

    cy.get(
      'button[data-href="/index.php?r=userManagement/addEditUser"]'
    ).click()
    cy.get('#usermanagement-modal-doalog').should('be.visible')
    cy.wait(500)
    cy.get('#User_Form_users_name').type(username)
    cy.get('#User_Form_full_name').type(fullname)
    cy.get('#User_Form_email').type(email)
    cy.get('label[for="utility_set_password_yes"]').click()
    cy.get('#User_Form_password').type(password)
    cy.get('#password_repeat').type(password)
    cy.get('#submitForm').click()

    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'User successfully created')

    // add permissions
    cy.get('#usermanagement-modal-doalog').should('be.visible')
    cy.get('input#all_surveys').check({ force: true })
    cy.get('#permission-modal-submitForm').click()

    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Saved permissions successfully.')

    // find user in table
    cy.get('#User_users_name').type(`${username}{enter}`, { force: true })
    cy.get('table tbody tr.odd').should('contain', username)

    // lougout and try to log in with that user
    cy.get('a').contains('admin').click()
    cy.get(
      'a.dropdown-item[href="/index.php?r=admin/authentication/sa/logout"]'
    ).click()
    cy.get('input#user').should('be.visible')

    cy.login(username, password)
    cy.get(
      'a.dropdown-item[href="/index.php?r=admin/authentication/sa/logout"]'
    ).should('exist')
  })

  it('create user with expiration date in future', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'userManagement/index'
    )

    const username = 'testuser2'
    const fullname = 'Test User 2'
    const email = 'testuser2@example.com'
    const password = 'Pass123!'
    const datetime = format(addDays(new Date(), 1), 'dd.MM.yyyy HH:mm')
    cy.log(datetime)

    cy.get(
      'button[data-href="/index.php?r=userManagement/addEditUser"]'
    ).click()
    cy.get('#usermanagement-modal-doalog').should('be.visible')
    cy.wait(500)
    cy.get('#User_Form_users_name').type(username)
    cy.get('#User_Form_full_name').type(fullname)
    cy.get('#User_Form_email').type(email)
    cy.get('#expires').clear().type(datetime)
    cy.get('label[for="utility_set_password_yes"]').click({ force: true })
    cy.get('#User_Form_password').type(password)
    cy.get('#password_repeat').type(password)
    cy.get('#submitForm').click()

    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'User successfully created')

    // permissions modal
    cy.get('#usermanagement-modal-doalog').should('be.visible')
    cy.get('#permission-modal-submitForm').click()

    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Saved permissions successfully.')

    // find user in table
    cy.get('#User_users_name').type(`${username}{enter}`, { force: true })
    cy.get('table tbody tr.odd').should('contain', username)

    // lougout and try to log in with that user
    cy.get('a').contains('admin').click()
    cy.get(
      'a.dropdown-item[href="/index.php?r=admin/authentication/sa/logout"]'
    ).click()
    cy.get('input#user').should('be.visible')

    cy.login(username, password)
    cy.get(
      'a.dropdown-item[href="/index.php?r=admin/authentication/sa/logout"]'
    ).should('exist')
  })

  it('create user with expiration date in past', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'userManagement/index'
    )

    const username = 'testuser3'
    const fullname = 'Test User 3'
    const email = 'testuser3@example.com'
    const password = '$123Pass'
    const datetime = format(subDays(new Date(), 1), 'dd.MM.yyyy HH:mm')
    cy.log(datetime)

    cy.get(
      'button[data-href="/index.php?r=userManagement/addEditUser"]'
    ).click()
    cy.get('#usermanagement-modal-doalog').should('be.visible')
    cy.wait(500)
    cy.get('#User_Form_users_name').type(username)
    cy.get('#User_Form_full_name').type(fullname)
    cy.get('#User_Form_email').type(email)
    cy.get('#expires').clear().type(datetime)
    cy.get('label[for="utility_set_password_yes"]').click({ force: true })
    cy.get('#User_Form_password').type(password)
    cy.get('#password_repeat').type(password)
    cy.get('#submitForm').click()

    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'User successfully created')

    // permissions modal
    cy.get('#usermanagement-modal-doalog').should('be.visible')
    cy.get('#permission-modal-submitForm').click()

    // check notification
    cy.get('.alert.alert-success.alert-dismissible')
      .should('be.visible')
      .and('contain', 'Saved permissions successfully.')

    // find user in table
    cy.get('#User_users_name').type(`${username}{enter}`, { force: true })
    cy.get('table tbody tr.odd').should('contain', username)

    // lougout and try to log in with that user
    cy.get('a').contains('admin').click()
    cy.get(
      'a.dropdown-item[href="/index.php?r=admin/authentication/sa/logout"]'
    ).click()
    cy.get('input#user').should('be.visible')

    cy.login(username, password)
    cy.get(
      'a.dropdown-item[href="/index.php?r=admin/authentication/sa/logout"]'
    ).should('not.exist')

    // user gets feedback
    cy.get('#notif-container > .alert.alert-danger')
      .should('be.visible')
      .and('contain', 'Incorrect username and/or password!')
  })
})

describe('Survey settings - Overview', () => {
  it('Share survey card', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view?surveyid=942815'
    )

    cy.get('.card-title')
      .contains('Share survey')
      .parents('.card.card-primary')
      .within(() => {
        // all languages are shown
        cy.get('ul.list-group li')
          .eq(0)
          .within(() => {
            cy.get('.card-label').should('contain', 'English (Base language):')
            cy.get('a').should(
              'have.attr',
              'href',
              `${Cypress.config('baseUrl')}942815?lang=en`
            )
          })
        cy.get('ul.list-group li')
          .eq(1)
          .within(() => {
            cy.get('.card-label').should('contain', 'Croatian:')
            cy.get('a').should(
              'have.attr',
              'href',
              `${Cypress.config('baseUrl')}942815?lang=hr`
            )
          })
        // end url is shown
        cy.get('ul.list-group li')
          .eq(2)
          .within(() => {
            cy.get('.card-label').should('contain', 'End URL:')
            cy.get('a').should('have.attr', 'href', 'http://www.limesurvey.org')
          })
        // number of questions/groups is shown
        cy.get('ul.list-group li')
          .eq(3)
          .within(() => {
            cy.get('.card-label')
              .should('contain', 'Number of questions/groups:')
              .next()
              .should('contain', '3/2')
          })
      })
  })

  it('Text elements card', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view?surveyid=942815'
    )

    cy.get('.card-title')
      .contains('Text elements')
      .parents('.card.card-primary')
      .within(() => {
        cy.get('a[data-bs-original-title="Survey text elements"]')
          .should('have.attr', 'href')
          .and(
            'contain',
            '/index.php/surveyAdministration/rendersidemenulink?subaction=surveytexts&surveyid=942815'
          )

        cy.get('ul.list-group li')
          .eq(0)
          .within(() => {
            cy.get('.card-label').should('contain', 'Description:')
            cy.get('.selector__toggle_description_text')
              .eq(1)
              .should('not.be.visible')
            cy.get('.selector__toggle_description_text')
              .eq(0)
              .should('be.visible')
              .and(
                'contain',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend risus in felis euismod pellentesque. Nam at pretiu...'
              )
            cy.get('.selector__toggle_full_text').click()
            cy.get('.selector__toggle_description_text')
              .eq(0)
              .should('not.be.visible')
            cy.get('.selector__toggle_description_text')
              .eq(1)
              .should('be.visible')
              .and(
                'contain',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam eleifend risus in felis euismod pellentesque. Nam at pretium nisi. Nunc odio eros, euismod a diam non, interdum cursus sem. Quisque vitae sagittis tellus. Morbi accumsan quis neque eu condimentum.'
              )
            cy.get('[data-target=".selector__toggle_description_text"]').should(
              'not.be.visible'
            )
          })
        cy.get('ul.list-group li')
          .eq(1)
          .within(() => {
            cy.get('.card-label').should('contain', 'Welcome:')
            cy.get('.selector__toggle_welcome_text')
              .eq(1)
              .should('not.be.visible')
            cy.get('.selector__toggle_welcome_text')
              .eq(0)
              .should('be.visible')
              .and(
                'contain',
                'Curabitur non facilisis nulla. Phasellus ac efficitur ipsum. Praesent in consequat risus, eget imperdiet risus. Aliquam ...'
              )
            cy.get('.selector__toggle_full_text').click()
            cy.get('.selector__toggle_welcome_text')
              .eq(0)
              .should('not.be.visible')
            cy.get('.selector__toggle_welcome_text')
              .eq(1)
              .should('be.visible')
              .and(
                'contain',
                'Curabitur non facilisis nulla. Phasellus ac efficitur ipsum. Praesent in consequat risus, eget imperdiet risus. Aliquam erat volutpat. Sed ac turpis ac mi convallis pharetra at ut lacus. Nullam imperdiet, ipsum a pulvinar auctor, lorem odio accumsan erat, non commodo nibh urna quis diam. Proin venenatis convallis tellus in sagittis.'
              )
            cy.get('[data-target=".selector__toggle_welcome_text"]').should(
              'not.be.visible'
            )
          })
        cy.get('ul.list-group li')
          .eq(2)
          .within(() => {
            cy.get('.card-label').should('contain', 'End message:')
            cy.get('.selector__toggle_end_text').eq(1).should('not.be.visible')
            cy.get('.selector__toggle_end_text')
              .eq(0)
              .should('be.visible')
              .and(
                'contain',
                'Aliquam luctus, tellus non ullamcorper aliquet, felis metus eleifend nunc, et sollicitudin libero mi at lectus. Donec in...'
              )
            cy.get('.selector__toggle_full_text').click()
            cy.get('.selector__toggle_end_text').eq(0).should('not.be.visible')
            cy.get('.selector__toggle_end_text')
              .eq(1)
              .should('be.visible')
              .and(
                'contain',
                'Aliquam luctus, tellus non ullamcorper aliquet, felis metus eleifend nunc, et sollicitudin libero mi at lectus. Donec interdum lacinia nunc, eget hendrerit risus condimentum vitae. Etiam efficitur dictum sapien, ac ornare lacus porta sit amet.'
              )
            cy.get('[data-target=".selector__toggle_end_text"]').should(
              'not.be.visible'
            )
          })
      })
  })

  it('Publication and access settings card', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view?surveyid=942815'
    )

    cy.get('.card-title')
      .contains('Publication and access settings')
      .parents('.card.card-primary')
      .within(() => {
        cy.get(
          'a[data-bs-original-title="Edit publication and access settings"]'
        )
          .should('have.attr', 'href')
          .and(
            'contain',
            '/index.php/surveyAdministration/rendersidemenulink?subaction=publication&surveyid=942815'
          )

        cy.get('ul.list-group li')
          .eq(0)
          .within(() => {
            cy.get('.card-label')
              .should('contain', 'Start date/time:')
              .next()
              .should('contain', '21.06.2023 14:08')
          })
        cy.get('ul.list-group li')
          .eq(1)
          .within(() => {
            cy.get('.card-label')
              .should('contain', 'Expiration date/time:')
              .next()
              .should('contain', '21.06.2033 14:08')
          })
        cy.get('ul.list-group li')
          .eq(2)
          .within(() => {
            cy.get('.card-label')
              .should('contain', 'Listed publicly:')
              .next()
              .should('contain', 'Yes')
          })
      })
  })

  it('Survey general settings card', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view?surveyid=942815'
    )

    cy.get('.card-title')
      .contains('Survey general settings')
      .parents('.card.card-primary')
      .within(() => {
        cy.get('a[data-bs-original-title="General survey settings"]')
          .should('have.attr', 'href')
          .and(
            'contain',
            '/index.php/surveyAdministration/rendersidemenulink?subaction=generalsettings&surveyid=942815'
          )

        cy.get('ul.list-group li')
          .eq(0)
          .within(() => {
            cy.get('.card-label')
              .should('contain', 'Owner:')
              .next()
              .should('contain', 'admin (your-email@example.net)')
          })
        cy.get('ul.list-group li')
          .eq(1)
          .within(() => {
            cy.get('.card-label')
              .should('contain', 'Administrator:')
              .next()
              .should('contain', 'Administrator (your-email@example.net)')
          })
        cy.get('ul.list-group li')
          .eq(2)
          .within(() => {
            cy.get('.card-label')
              .should('contain', 'Theme:')
              .next()
              .should('contain', 'Fruity TwentyThree ( fruity_twentythree )')
            cy.get('a[title="Edit theme options"]')
              .should('have.attr', 'href')
              .and(
                'contain',
                '/index.php/themeOptions/updateSurvey?surveyid=942815'
              )
            cy.get('a[title="Open theme editor in new window"]')
              .should('have.attr', 'href')
              .and(
                'contain',
                '/index.php/admin/themes/sa/view/templatename/fruity_twentythree'
              )
          })
      })
  })

  it('Hints and warnings card', function () {
    cy.loginByCSRF(
      this.auth['admin'].username,
      this.auth['admin'].password,
      'surveyAdministration/view?surveyid=942815'
    )

    cy.get('.card-title')
      .contains('Hints and warnings')
      .parents('.card.card-primary')
      .within(() => {
        cy.get('ul.list-group li')
          .eq(0)
          .should('contain', 'Responses to this survey are NOT anonymized.')
        cy.get('ul.list-group li')
          .eq(1)
          .should('contain', 'It is presented group by group.')
        cy.get('ul.list-group li')
          .eq(2)
          .should('contain', 'Participants can save partially finished surveys')
        cy.get('ul.list-group li')
          .eq(3)
          .should(
            'contain',
            'Basic email notification is sent to: notify.me@test.ing'
          )
        cy.get('ul.list-group li')
          .eq(4)
          .should(
            'contain',
            'Detailed email notification with response data is sent to: notify.me.detail@test.ing'
          )
      })
  })
})

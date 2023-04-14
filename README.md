# Limesurvey Core Testing 

This is the home of automated tests for Limesurvey core application using [Cypress.io](https://www.cypress.io/)

## Prerequisites

* [Node.js](https://nodejs.org/en)
* [Yarn](https://yarnpkg.com/)

## Local Setup

To install dependencies run ```yarn```

## How to use it

* ```yarn cypress:e2e:open``` - start e2e tests in cypress interactive runner
* ```yarn cypress:e2e:run``` - run e2e tests in headless mode

* ```yarn cypress:e2e:run --browser chrome``` - run e2e tests in headless chrome browser

## Note

I still need to implement communication with local database and seeding of data needed for the tests.
If you want to run the tests with expected outcome, you just need to change credentials in ```fixtures/auth.json``` to existing ones in your local database.

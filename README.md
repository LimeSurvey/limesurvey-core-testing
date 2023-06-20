# Limesurvey Core Testing 

This is the home of automated tests for Limesurvey core application using [Cypress.io](https://www.cypress.io/)

## Prerequisites

* [Node.js](https://nodejs.org/en)
* [Yarn](https://yarnpkg.com/)
* MySQL
* local dev environment setup using [ls-docker-dev-env](https://bitbucket.org/limesurvey/ls-docker-dev-env/src/master/)

## Local Setup

To install dependencies run ```yarn```

### Data

Create mysql config file ```~/.my.cnf``` with this content:
```
[mysql]
user=root
password=root
host=ls-dev-mysql
```

Cd into ```cypress/data``` directory.

Dump your data:
```mysqldump --no-create-db --no-create-info --column-statistics=0 ls-ce > database_backup.sql```

Run the seed script (zsh):
```../../seed_script.sh```


## How to use it

* ```yarn cypress:e2e:open``` - start e2e tests in cypress interactive runner
* ```yarn cypress:e2e:run``` - run e2e tests in headless mode

* ```yarn cypress:e2e:run --browser chrome``` - run e2e tests in headless chrome browser
* ```yarn cypress:e2e:run --spec cypress/e2e/create_survey.cy.js``` - run tests from specific file

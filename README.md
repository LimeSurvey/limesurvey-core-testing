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

These tests expect the application to be configured with 'urlFormat' = 'get'.

## Parallel runs

* after a successful run, you get run_times.json files for each run
* merge the contents to run_times.json and put this file in the root directory fo this project
* run the script split_tests_into_groups.js and it will distribute the tests into 2 groups (group1,group2) so that their run time is nearly equal
* this will ensure the optimal run time of the whole test suite

## Api tests

* ```CYPRESS_BASE_URL=http://ls-ce/ yarn cypress:api:run``` - replace ls-ce with your local dev env

REST API tests expect the application to be configured with 'urlFormat' = 'path'.
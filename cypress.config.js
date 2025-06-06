const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
  },
  env: {
    DB_HOST: 'ls-dev-mysql',
    DB_USER: 'root',
    DB_PASSWORD: 'root',
    DB_DATABASE: 'ls-ce',
  },
  scrollBehavior: 'center',
  e2e: {
    baseUrl: 'http://ls-ce/index.php/',
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      const { runQuery } = require('./cypress/support/utils/db')

      on('task', {
        queryDb(query) {
          return runQuery(query, config)
        },
      })
    },
  },
})

const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: true,
  env: {
    DB_HOST: 'ls-dev-mysql',
    DB_USER: 'root',
    DB_PASSWORD: 'root',
    DB_DATABASE: 'ls-ce',
  },
  e2e: {
    baseUrl: 'http://ls-ce/index.php?r=',
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

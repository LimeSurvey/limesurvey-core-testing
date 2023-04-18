const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
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
  db: {
    host: 'ls-dev-mysql',
    user: 'root',
    password: 'root',
    database: 'ls-ce',
  },
})

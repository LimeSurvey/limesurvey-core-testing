const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  e2e: {
    baseUrl: 'http://ls-ce/index.php?r=',
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
})

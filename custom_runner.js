const cypress = require('cypress')
const fse = require('fs-extra')
const { merge } = require('mochawesome-merge')
const _ = require('lodash')
const cheerio = require('cheerio')
const yargs = require('yargs')

const argv = yargs
  .options({
    browser: {
      alias: 'b',
      describe: 'choose browser that you wanna run tests on',
      default: 'chrome',
      choices: ['chrome', 'electron'],
    },
    spec: {
      alias: 's',
      describe: 'run test with specific spec file',
      default: 'cypress/e2e/**/*.cy.js',
    },
    parallel: {
      alias: 'p',
      describe: 'run test in parallel',
      default: 'n',
    },
  })
  .help().argv

async function formatResults(jsonReport) {
  try {
    let runTimes = {}
    let $ = cheerio.load(
      fse.readFileSync('./templates/test-result-template.html')
    )
    await fse.writeJson('./cypress/reports/report.json', jsonReport)
    _.forEach(jsonReport.results, (result) => {
      let fileName = result.file.split('/').slice(-1)[0].slice(0, -6)
      _.forEach(result.suites, (suite) => {
        let includeHeader = true
        runTimes[fileName] = suite.duration
        if (suite.failures.length) {
          _.forEach(suite.tests, (test) => {
            if (test.fail) {
              if (includeHeader) {
                $('tbody').append(`<tr class="suite">
                                    <td>Suite</td>
                                    <td>${suite.title}</td>
                                    </tr>
                                `)
                includeHeader = false
              }
              let image = fse.readFileSync(
                `./cypress/screenshots/${
                  argv.parallel == 'y'
                    ? result.file.split('/').slice(-1)[0]
                    : result.file.split('/').slice(-2).join('/')
                }/${suite.title} -- ${test.title
                  .replaceAll('/', '')
                  .replaceAll('"', '')} (failed).png`,
                'base64'
              )
              $('tbody').append(`
                                <tr class="failed">
                                  <td>Test</td>
                                  <td>${test.title}</td>
                                </tr>
                                <tr>
                                  <td>Stack trace</td>
                                  <td class="trace">${test.err.estack
                                    .replaceAll('<', '&lt;')
                                    .replaceAll('>', '&gt;')}</td>
                                </tr>
                                <tr>
                                  <td>Screenshot</td>
                                  <td><img src="data:image/png;base64, ${image}" width=1000/></td>
                                </tr>
                            `)
            }
          })
        }
      })
    })
    await fse.outputFile('./templates/test-result.html', $.html())
    await fse.writeJson('run_times.json', runTimes)
  } catch (err) {
    console.error(err)
  }
}

async function runTests() {
  await fse.remove('./cypress/reports') // remove the report folder
  const { totalFailed } = await cypress.run({
    browser: argv.browser,
    spec: argv.spec,
  }) // get the number of failed tests
  const jsonReport = await merge({ files: ['./cypress/reports/*.json'] })
  await formatResults(jsonReport)
  process.exit(totalFailed) // exit with the number of failed tests
}

runTests()

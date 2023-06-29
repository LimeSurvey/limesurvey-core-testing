const randomString = (length) => {
  return Array(length)
    .fill(0)
    .map(() => Math.random().toString(36).charAt(2))
    .join('')
}

const toCapitalizedStr = (s) =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : ' ' + d))

const getSurveyIdFromUrl = (s) => s.match('surveyid=([0-9]*)&')[1]

const getIframeDocument = (selector) => {
  return cy.get(selector).its('0.contentDocument').should('exist')
}

const getIframeBody = (selector) => {
  return getIframeDocument(selector)
    .its('body')
    .should('not.be.undefined')
    .then(cy.wrap)
}

module.exports = {
  randomString,
  toCapitalizedStr,
  getSurveyIdFromUrl,
  getIframeBody,
}

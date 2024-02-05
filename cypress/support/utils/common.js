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

const mapValuesDeep = (obj, fn, key) =>
  Cypress._.isArray(obj)
    ? Cypress._.map(obj, (innerObj, idx) => mapValuesDeep(innerObj, fn, idx))
    : Cypress._.isPlainObject(obj)
    ? Cypress._.mapValues(obj, (val, key) => mapValuesDeep(val, fn, key))
    : Cypress._.isObject(obj)
    ? obj
    : fn(obj, key)

const clearRelativeTimestamps = (obj) => {
  return mapValuesDeep(obj, (v, k) =>
    k === 'lastLogin' || k === 'modified' ? (v = '') : v
  )
}

const isKeyValuePresent = (jsonObject, keyPath, expectedValue) => {
  try {
    const keys = keyPath.split('.')
    let currentObject = jsonObject

    for (const key of keys) {
      if (Array.isArray(currentObject) && /^\d+$/.test(key)) {
        const index = parseInt(key, 10)
        if (index < 0 || index >= currentObject.length) {
          return false
        }
      } else if (!(key in currentObject)) {
        return false
      }

      currentObject = currentObject[key]
    }

    return expectedValue
      ? JSON.stringify(currentObject) === JSON.stringify(expectedValue)
      : true
  } catch (error) {
    console.error('Error checking JSON part:', error)
    return false
  }
}

module.exports = {
  randomString,
  toCapitalizedStr,
  getSurveyIdFromUrl,
  getIframeBody,
  clearRelativeTimestamps,
  isKeyValuePresent,
}

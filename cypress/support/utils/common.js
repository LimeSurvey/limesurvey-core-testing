const randomString = (length) => {
  return Array(length)
    .fill(0)
    .map(() => Math.random().toString(36).charAt(2))
    .join('')
}

const toCapitalizedStr = (s) =>
  s.replace(/^_*(.)|_+(.)/g, (s, c, d) => (c ? c.toUpperCase() : ' ' + d))

const getSurveyIdFromUrl = (s) => s.match('surveyid=([0-9]*)&')[1]

module.exports = {
  randomString,
  toCapitalizedStr,
  getSurveyIdFromUrl,
}

const mysql = require('mysql')

const runQuery = (query, config) => {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.db)
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        // console.log(results)
        return resolve(results)
      }
    })
  })
}

module.exports = {
  runQuery,
}

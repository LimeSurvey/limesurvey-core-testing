const mysql = require('mysql2')

const runQuery = (query, config) => {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection({
    host: config.env.DB_HOST,
    user: config.env.DB_USER,
    password: config.env.DB_PASSWORD,
    database: config.env.DB_DATABASE,
  })
  // start connection to db
  connection.connect()
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error)
      else {
        connection.end()
        return resolve(results)
      }
    })
  })
}

module.exports = {
  runQuery,
}

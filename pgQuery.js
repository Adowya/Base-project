const { Pool } = require('pg')

let _pool

/**
 * Postgresql connection pool
 */
const pool = () => {
  if (!_pool) {
    _pool = new Pool({
      user: 'clement',
      password: '',
      host: 'localhost',
      port: 5432,
      database: 'clement'
    })
  }
  return _pool
}

/**
 * 
 * @param {string} str String query
 * @param {Array} args Array of params 
 * @returns {Object} result of pg query
 */
const pgQuery = (str, args) => {
  return pool().connect().then(client =>
    client.query(str, args).then(
      result => {
        client.release()
        return result
      },
      error => {
        client.release()
        throw error
      }
    )
  )
}

module.exports = pgQuery

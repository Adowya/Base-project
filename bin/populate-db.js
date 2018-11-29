const pgQuery = require('../pgQuery')
const { transports } = require('../data/transports.json');

/**
 * Create transports Table & populate table from ../data/transports.json
 * @param  {} async(
 */
(async () => {

  console.log('Creating transports table')

  await pgQuery(
    `CREATE TABLE transports (
      id                    SERIAL        PRIMARY KEY,
      title                 text,
      coordinates_from      json,
      coordinates_to        json,
      vehicule              text,
      comment               text
    );`
  )
  
  console.log('Populating rows')

  for (const transport of transports) {
      await pgQuery(
          `INSERT INTO transports (title, coordinates_from, coordinates_to, vehicule, comment) VALUES($1, $2, $3, $4, $5)`,
          [transport.title, transport.coordinates_from, transport.coordinates_to, transport.vehicule, transport.comment]
      )
  }

  console.log('done!')
})()
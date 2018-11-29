const pgQuery = require('../pgQuery')

/**
 * Param middleware load transport
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Function} next
 * @param  {string} id
 * @returns {Promise|Object} Return next promise or Object response if fail
 */
const load = async (req, res, next, id) => {
    try {
        const { rows } = await pgQuery(`
        SELECT * FROM transports WHERE id = $1`,
        [ id ])

        if (rows.length === 0) {
            return res.json({ "success": false, "message": 'No such Transport exists!' })
        }

        req.transport = rows[0]
        next()
    } catch (error) {
        return res.json({ "success": false, "error": error, "message": 'No such Transport exists!' })
    }
}

/**
 * Get All transports
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Function} next
 * @returns {Array} Array of all transports in db
 */
const all = async (req, res, next) => {
    const { rows } = await pgQuery(`SELECT * FROM transports`)

    return rows
}

/**
 * Create transport
 * @param  {Object} body
 * @returns {Object} Object created
 */
const create = async (body) => {
    const { rows } = await pgQuery(
        `INSERT INTO transports (title, coordinates_from, coordinates_to, vehicule, comment) VALUES($1, $2, $3, $4, $5)`,
        [body.title, body.coordinates_from, body.coordinates_to, body.vehicule, body.comment]
    )

    return rows
}

/**
 * Read transport
 * @param  {Object} transport
 * @returns {Object} Single transport Object
 */
const read = (transport) => {
    return transport
}

/**
 * Update transport
 * @param  {Object} transport
 * @param  {Object} body
 * @returns {Object} Single transport Object
 */
const update = async (transport, body) => {
    const { row } = await pgQuery(
        `UPDATE transports SET title = $2::text, coordinates_from = $3::json, coordinates_to = $4::json, vehicule = $5::text, comment = $6::text WHERE id = $1`,
        [transport.id, body.title, body.coordinates_from, body.coordinates_to, body.vehicule, body.comment]
    )

    return row
}

/**
 * Remove transport
 * @param  {Object} transport
 * @returns {Object} Single transport Object
 */
const remove = async (transport) => {
    const { row } = await pgQuery(
        `DELETE FROM transports WHERE id = $1`,
        [transport.id]
    )

    return row
}

module.exports = {
    load,
    all,
    create,
    read,
    update,
    remove
}
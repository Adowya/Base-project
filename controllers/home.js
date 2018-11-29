let transports = require('../data/transports.json');

/**
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Function} next Move on to the next middleware
 * @returns {} Render ejs template with data Object
 */
const index = (req, res, next) => {
    return res.status(200).render('index.html.ejs', { data: transports })
}

module.exports = {
    index
}
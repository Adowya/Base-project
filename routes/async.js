const router = require('express').Router()
const methods = ['all', 'get', 'post', 'put', 'delete']

/**
 * Override router[method]
 * Handles router execution and responses
 * e.g: router.[method](route, action, params)
 * @param  {string} route : String path
 * @param  {Function} action : Middleware controller
 * @param  {Array} params : Params controller
 * @returns {Function} Override router or Object responses
 */
const asyncRouter = () => {
    methods.map(method => {
        const existing = router[method]
        // Redefined router function for methods you wish with your own params
        router[method] = (route, action, params) => {
            if (!action) {
                return existing.call(router, route)
            }
            existing.call(router, route, (req, res, next) => {
                let boundParams = params ? params(req, res, next) : [req, res, next]
                // Since we are passing that handler into Promise.resolve it will resolve with whatever value our route handler returns
                // https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
                Promise.resolve(action(...boundParams))
                    .then(result => {
                        return res.status(200).json({ success: true, time: Date.now(), data: result })
                    })
                    .catch(next)
            })
        }
    })

    return router
}

module.exports = asyncRouter
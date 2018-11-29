const { news, transport } = require('../controllers')
const asyncRouter = require('./async')

const router = asyncRouter();

/**
 * Transport router
 */
router.param('transportId', async (req, res, next, id) => await transport.load(req, res, next, id))

router.get('/transports', transport.all)
router.post('/transport', transport.create, req => [req.body])
router.get('/transport/:transportId', transport.read, req => [req.transport])
router.put('/transport/:transportId', transport.update, req => [req.transport, req.body])
router.delete('/transport/:transportId', transport.remove, req => [req.transport])

/**
 * News router
 */
router.get('/news', news.all)

/**
 * 404
 */
router.use((req, res, next) => {
    res.status(404).json({
        message: 'Whoa! Something went wrong'
      })
 })
 
 /**
  * Error-handler
  */
 router.use((err, req, res, next) => {
   console.error('~~~ Unexpected error exception start ~~~');
   console.error(err);
   console.error('~~~ Unexpected error exception end ~~~');
 
   return res.status(err.status || 500).json({
     status: err.status || 500,
     message: err.message || 'Whoa! Something went wrong, could you let us know?'
   })
 })

module.exports = router;
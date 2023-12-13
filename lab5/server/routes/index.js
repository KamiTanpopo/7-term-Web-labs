const Router = require('express')
const router = new Router()
const userRouters = require('./userRoutes')

router.use('/user', userRouters)

module.exports = router
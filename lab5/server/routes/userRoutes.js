const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.put('/', userController.update)
router.delete('/:id', userController.delete)

module.exports = router
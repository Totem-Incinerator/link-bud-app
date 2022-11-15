const {Router} = require('express')
const router = Router()

const {createUser, login} = require('../controller/UserController')

router.post('/signup', createUser)

router.post('/login', login)

module.exports = router
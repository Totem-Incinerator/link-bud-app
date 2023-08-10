const {Router} = require('express')
const router = Router()

const {createUser, login} = require('../controller/UserController')
const {userValidator} = require('../validators/UserValidators')

router.post('/signup', userValidator , createUser)

router.post('/login', userValidator, login)

module.exports = router
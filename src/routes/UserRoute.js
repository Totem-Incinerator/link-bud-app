const {Router} = require('express')
const router = Router()

const {createUser, login} = require('../controller/UserController')
const {userValidatorSignup, userValidatorLogin} = require('../validators/UserValidators')

router.post('/signup', userValidatorSignup , createUser)

router.post('/login', userValidatorLogin, login)

module.exports = router
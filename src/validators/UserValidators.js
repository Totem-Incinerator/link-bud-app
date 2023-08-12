const {check} = require('express-validator');
const {validateErrors} = require('../middlewares/fieldValidate')
const {validateEmailExists, validateEmailNotExists} = require('../helpers/dbValidate')

const userValidatorSignup = [
    check('email', 'email is required').trim().notEmpty().isEmail(),
    check('email').custom(validateEmailExists),
    check('password','password required').trim().notEmpty().isLength({min: 5}),
    validateErrors
]

const userValidatorLogin = [
    check('email', 'email is required').trim().notEmpty().isEmail(),
    check('email').custom(validateEmailNotExists),
    check('password','password required').trim().notEmpty().isLength({min: 5}),
    validateErrors
]

module.exports = {
    userValidatorLogin,
    userValidatorSignup
}
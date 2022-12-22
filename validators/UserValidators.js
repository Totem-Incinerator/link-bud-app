const {check} = require('express-validator');
const {validateErrors} = require('../middlewares/fieldValidate')


const userValidator = [
    check('email', 'email is required').trim().notEmpty().isEmail(),
    check('password','password required').trim().notEmpty().isLength({min: 5}),
    validateErrors
]

module.exports = {
    userValidator
}
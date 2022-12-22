const {check} = require('express-validator')

const {validateUserExists, validateListExists} = require('../helpers/dbValidate')
const {validateErrors} = require('../middlewares/fieldValidate')
const {jwtValidate} = require('../middlewares/jwtValidate')

const getListValidate = [
    check('id', 'user_id debe ser un numero entero').isInt(),
    check('id').custom(validateUserExists),
    validateErrors
]

const createListValidate = [
    jwtValidate,
    check('title', 'ingrese el titulo de la lista').trim().isString().notEmpty().isLength({max: 30}),
    check("description", "ingrese la descripcion de la lista").trim().isString().notEmpty().isLength({max: 240}),
    check("urls", "urls requeridas").isArray(),
    validateErrors
]

const updateListValidate = [
    check('id').isInt(),
    check('id').custom(validateListExists),
    check('title', 'ingrese el titulo de la lista').trim().isString().notEmpty().isLength({max: 30}).optional(),
    check("description", "ingrese la descripcion de la lista").trim().isString().notEmpty().isLength({max: 240}).optional(),
    check("urls", "urls requeridas").isArray().optional(),
    jwtValidate,
    validateErrors
]

const deleteListValidate = [
    check('id').isInt(),
    check('id').custom(validateListExists),
    jwtValidate,
    validateErrors
]

module.exports = {
    createListValidate,
    deleteListValidate,
    getListValidate,
    updateListValidate
}
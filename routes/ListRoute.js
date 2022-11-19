const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()

const {validateUserExists} = require('../helpers/dbValidate')
const {validateErrors} = require('../middlewares/fieldValidate')

const {createLinkList, getListsByUser, updateList} = require('../controller/ListLinkController')

router.get('/:id', [
    check('id', 'user_id debe ser un numero entero').isInt(),
    check('id').custom(validateUserExists),
    // TODO: añadir validacion de token
    validateErrors
], getListsByUser)

router.post('/', [
    check('title', 'ingrese el titulo de la lista').isString().notEmpty().isLength({max: 30}),
    check("description", "ingrese la descripcion de la lista").isString().notEmpty().isLength({max: 240}),
    check("slug", "ingresa el slug").isString().notEmpty().isLength({max: 15}),
    check("urls", "urls requeridas").isArray(),
    check('user_id', 'user_id debe ser un numero entero').isInt(),
    check('user_id').custom(validateUserExists),
    // TODO: añadir validacion de token
    validateErrors
], createLinkList)

router.put('/:id', [
    check('title', 'ingrese el titulo de la lista').isString().notEmpty().isLength({max: 30}).optional(),
    check("description", "ingrese la descripcion de la lista").isString().notEmpty().isLength({max: 240}).optional(),
    check("slug", "ingresa el slug").isString().notEmpty().isLength({max: 15}).optional(),
    check("urls", "urls requeridas").isArray().optional(),
    // TODO: añadir validacion de token
    validateErrors
], updateList)

module.exports = router
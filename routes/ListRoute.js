const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()

// MIDDLEWARES AND HELPERS
const {validateUserExists, validateListExists} = require('../helpers/dbValidate')
const {validateErrors} = require('../middlewares/fieldValidate')
const {jwtValidate} = require('../middlewares/jwtValidate')

// CONTROLLERS
const {createLinkList, getListsByUser, updateList, deleteList} = require('../controller/ListLinkController')

router.get('/:id', [
    check('id', 'user_id debe ser un numero entero').isInt(),
    check('id').custom(validateUserExists),
    validateErrors
], getListsByUser)

router.post('/', [
    jwtValidate,
    check('title', 'ingrese el titulo de la lista').isString().notEmpty().isLength({max: 30}),
    check("description", "ingrese la descripcion de la lista").isString().notEmpty().isLength({max: 240}),
    check("slug", "ingresa el slug").isString().notEmpty().isLength({max: 15}),
    check("urls", "urls requeridas").isArray(),
    check('user_id', 'user_id debe ser un numero entero').isInt(),
    check('user_id').custom(validateUserExists),
    validateErrors
], createLinkList)

router.put('/:id', [
    check('id').isInt(),
    check('id').custom(validateListExists),
    check('title', 'ingrese el titulo de la lista').isString().notEmpty().isLength({max: 30}).optional(),
    check("description", "ingrese la descripcion de la lista").isString().notEmpty().isLength({max: 240}).optional(),
    check("slug", "ingresa el slug").isString().notEmpty().isLength({max: 15}).optional(),
    check("urls", "urls requeridas").isArray().optional(),
    jwtValidate,
    validateErrors
], updateList)


router.delete('/:id', [
    check('id').isInt(),
    check('id').custom(validateListExists),
    jwtValidate,
    validateErrors
], deleteList)

module.exports = router
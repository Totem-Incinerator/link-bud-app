const {Router} = require('express')
const {check} = require('express-validator')
const router = Router()

const {validateUserExists} = require('../helpers/dbValidate')
const {validateErrors} = require('../middlewares/fieldValidate')
const {createLinkList} = require('../controller/ListLinkController')

router.post('/', [
    check('title', 'ingrese el titulo de la lista').isString().notEmpty().isLength({max: 30}),
    check("description", "ingrese la descripcion de la lista").isString().notEmpty().isLength({max: 240}),
    check("slug", "ingresa el slug").isString().notEmpty().isLength({max: 15}),
    check("urls", "urls requeridas").isArray(),
    check('user_id', 'user_id debe ser un numero entero').isInt(),
    check('user_id').custom(validateUserExists),

    validateErrors
], createLinkList)


module.exports = router
const {Router} = require('express')
const router = Router()

const {createLinkList} = require('../controller/ListLinkController')

router.post('/', createLinkList)


module.exports = router
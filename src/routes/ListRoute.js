const {Router} = require('express')
const router = Router()

// CONTROLLERS
const {createLinkList, getListsByUser, updateList, deleteList} = require('../controller/ListLinkController')

// VALIDATORS
const {getListValidate, createListValidate, updateListValidate, deleteListValidate} = require('../validators/ListValidators')

// Get list by user id
router.get('/:id', getListValidate, getListsByUser)

// Create a list
router.post('/', createListValidate, createLinkList)

// Update a list sent id
router.put('/:id', updateListValidate, updateList)

// Delete list sent id
router.delete('/:id', deleteListValidate, deleteList)

module.exports = router
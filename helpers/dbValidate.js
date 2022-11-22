const User = require('../model/UserModel')
const List = require('../model/ListModel')

const validateUserExists = async(id = 0) => {

    const user = await User.findByPk(id)

    if(!user){
        throw new Error(`el usuario con id:${id} no existe`)
    }
}

const validateListExists = async(id = 0) => {

    const list = await List.findByPk(id)

    if(!list || !list.status){
        throw new Error(`no existe una lista con el id ${id}`)
    }

}

module.exports = {
    validateListExists,
    validateUserExists
}
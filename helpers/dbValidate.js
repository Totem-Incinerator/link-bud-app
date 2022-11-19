const User = require('../model/UserModel')

const validateUserExists = async(id = 0) => {

    const user = await User.findByPk(id)

    if(!user){
        throw new Error(`el usuario con id:${id} no existe`)
    }
}

module.exports = {
    validateUserExists
}
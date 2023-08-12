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


const validateEmailExists = async (email = '') => {
    const emailValidate = await User.findOne({where: {email: email}})
    if(emailValidate){
        throw new Error("email ya registrado")
    }
}

const validateEmailNotExists = async (email = '') => {
    const emailValidate = await User.findOne({where: {email: email}})
    if(!emailValidate){
        throw new Error("email no registrado")
    }
}

module.exports = {
    validateEmailExists,
    validateEmailNotExists,
    validateListExists,
    validateUserExists
}
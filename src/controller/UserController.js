const {request, response} = require('express')

const User = require('../model/UserModel')
const {jwtGenerator} = require('../helpers/jwtGenerator')
const {passwordEncrypter, passwordValidator} = require("../helpers/passwordEncrypter")

const createUser = async(req = request, res = response) => {

    const data = req.body

    data.password = passwordEncrypter(data.password)

    try{
                
        const user = await User.create(data)
        
        await user.save()
        
        res.status(201).json({
            msg: 'usuario creado correctamente',
            user
        })

    }catch(error){
        console.error(error)
        res.status(500).json({
            msg: 'error en el servidor, contacte con el administrador'
        })
    }

}

const login = async(req = request, res = response) => {

    const {email, password} = req.body

    try{

        const validateUser = await User.findOne({
            where: {email: email}
        })

        if(!passwordValidator(password, validateUser.password)){
            return res.status(401).json({
                msg: 'error, usuario no encontrado - password'
            })
        }

        const token = await jwtGenerator(validateUser.email)

        res.status(200).json({
            user: validateUser,
            token
        })
        

    } catch(error){
        console.error(error)
        res.status(500).json({
            msg: 'error en el servidor'
        })
    }
}

module.exports = {
    createUser,
    login
}
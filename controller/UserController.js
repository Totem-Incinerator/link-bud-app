const {request, response} = require('express')
const bcrypt = require('bcrypt')
const User = require('../model/UserModel')
const {jwtGenerator} = require('../helpers/jwtGenerator')

const createUser = async(req = request, res = response) => {

    const data = req.body

    const salt = bcrypt.genSaltSync()

    data.password = bcrypt.hashSync(data.password, salt)

    try{

        const validateUser = await User.findOne({
            where: {email: data.email}
        }) 

        if(validateUser){{
            return res.status(400).json({
                msg: 'ya existe un usuario con ese email'
            })
        }}

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

        if(!validateUser){
            return res.status(404).json({
                msg: 'error, usuario no encontrado - usuario'
            })
        }

        if(!bcrypt.compareSync(password, validateUser.password)){
            return res.status(404).json({
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
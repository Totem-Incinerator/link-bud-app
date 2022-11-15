const jwt = require('jsonwebtoken');
const {request, response} = require('express');
const User = require('../models/UserModel');

const jwtValidate = async(req = request, res = response, next) => {

    // obtemos el token desde el header
    const token = req.header('x-token');

    // validamos si se envio el token
    if(!token){
        return res.status(401).json({
            msg: 'token not sent'
        });
    }

    try{

        // obtenemos el uid del token con el cual se realiza la peticion
        const {id} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // guardamos el uid en la request
        req.id = id

        // obtenemos la informacion del usuario autenticado
        const userAuth = await User.findOne({
            where:{id: id}
        })

        // validamos que exista el usuario
        if(!userAuth){
            return res.status(401).json({
                msg: 'invalid token - user not found'
            })
        }

        // guardamos el usuario en la request
        req.user = userAuth;
        
        next();

    } catch(error){
        console.log(error)
        res.status(401).json({
            msg: 'invalid token'
        })
    }
    
}

module.exports = {
    jwtValidate
}
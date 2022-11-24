const jwt = require('jsonwebtoken');
const {request, response} = require('express');
const User = require('../model/UserModel');

const jwtValidate = async(req = request, res = response, next) => {

    // obtemos el token desde el header
    const token = req.header('x-token');

    // validamos si se envio el token
    if(!token){
        return res.status(401).json({
            msg: 'no se ha enviado el token'
        });
    }

    try{

        // obtenemos el uid del token con el cual se realiza la peticion
        const {email} = jwt.verify(token, process.env.SECRET_KEY);
        
        // guardamos el uid en la request
        req.email = email
        
        // obtenemos la informacion del usuario autenticado
        const userAuth = await User.findOne({where:{email: email}})
        
        // validamos que exista el usuario
        if(!userAuth){
            return res.status(401).json({
                msg: 'token invalido - usuario no encontrado'
            })
        }

        // guardamos el usuario en la request
        req.user = userAuth;
        
        next();

    } catch(error){
        console.log(error)
        res.status(401).json({
            msg: 'error interno, contacte al administrador'
        })
    }
    
}

module.exports = {
    jwtValidate
}
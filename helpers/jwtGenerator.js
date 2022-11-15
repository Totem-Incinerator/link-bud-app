const jwt = require('jsonwebtoken');

const jwtGenerator = (id = '') => {

    return new Promise( (resolve, reject) => {

        // id a encriptar
        const payload = {id};

        // crear Json Web Token
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if(err){
                console.log(err)
                reject("error jwt not generated")
                return
            }

            resolve(token)
        })

    } )
}

module.exports = {
    jwtGenerator
}

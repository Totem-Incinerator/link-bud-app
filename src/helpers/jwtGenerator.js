const jwt = require('jsonwebtoken');

const jwtGenerator = (email = '') => {

    return new Promise( (resolve, reject) => {

        // email a encriptar
        const payload = {email};

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

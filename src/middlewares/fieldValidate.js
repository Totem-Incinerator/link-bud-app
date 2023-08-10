const {validationResult} = require('express-validator')

const validateErrors = (req, res, next) => {

    if(!validationResult(req).isEmpty()){
        return res.status(400).json(validationResult(req))
    }

    next()
}

module.exports = {
    validateErrors
}
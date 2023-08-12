const bcrypt = require('bcrypt')

const passwordEncrypter = (password = '',) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync())
}

const passwordValidator = (password = '',  userPassword) => {
    return bcrypt.compareSync(password, userPassword)
}

module.exports = {
    passwordEncrypter,
    passwordValidator
}
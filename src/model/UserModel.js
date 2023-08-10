const {DataTypes} = require('sequelize')
const db = require('../Db/Dbconfig')

const User = db.define('User', {
    email:{
        type: DataTypes.STRING,
        validate: {isEmail: true},
        unique: true
    },
    password:{
        type: DataTypes.STRING
    }
}, {timestamps: true})

module.exports = User
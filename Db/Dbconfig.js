const {Sequelize} = require('sequelize')

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASSWORD
const dbDialect = process.env.DB_DIALECT

const db = new Sequelize(dbName, dbUser, dbPass, {
    host: 'localhost',
    dialect: dbDialect
})

module.exports = db
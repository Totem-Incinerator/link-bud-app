const {Sequelize} = require('sequelize')

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASSWORD
const dbDialect = process.env.DB_DIALECT
const dbHost = process.env.DB_HOST

const db = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: dbDialect,
    logging: false
})

module.exports = db
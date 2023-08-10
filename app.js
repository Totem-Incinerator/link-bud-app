require('dotenv').config()
const Server = require('./src/Server/Server')
const server = new Server()
server.listen()
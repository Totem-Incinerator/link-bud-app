require('dotenv').config()
const Server = require('./Server/Server')
const server = new Server()
server.listen()
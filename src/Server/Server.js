const db = require('../Db/Dbconfig')
const cors = require('cors')
const express = require('express')

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            auth:'/api/auth',
            list: '/api/list'
        }

        this.databaseConnection()

        this.middlewares()

        this.routes()
    }

    async databaseConnection(){

        try{

            db.authenticate()

            console.log(`conectado a la base de datos ${process.env.DB_NAME}`)

        }catch(error){

            console.error(error);
            throw new Error('conexión a la base de datos fallida :(')

        }
    }
    
    middlewares(){

        // Cors
        this.app.use( cors() )

        // Habilitar Json
        this.app.use( express.json() )

        // Directorio publico
        this.app.use( express.static("src/public") )

    }

    routes(){

        // Auth
        this.app.use( this.paths.auth, require('../routes/UserRoute') )

        this.app.use( this.paths.list, require('../routes/ListRoute') )

    }

    listen(){

        this.app.listen(this.port, () => {
            console.log('corriendo en el puerto', this.port)
        })
    }

}

module.exports = Server
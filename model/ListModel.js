const {DataTypes} = require('sequelize')
const db = require('../Db/Dbconfig')

const List = db.define('List', {
    title:{
        type: DataTypes.STRING,
    },
    description:{
        type: DataTypes.STRING
    },
    slug:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.TINYINT
    },
    urls:{
        type: DataTypes.JSON
    },
    user_id:{
        type: DataTypes.INTEGER
    }
})

module.exports = List
const {request, response} = require('express')
const List = require('../model/ListModel')

const createLinkList = async(req = request, res = response) => {
    
    const data = req.body
    
    try{

        const lista = await List.create(data)

        await lista.save()

        res.status(201).json({
            msg: 'lista creada correctamente',
            list: lista
        })

    }catch(error){
        console.error(error)
        res.status(500).json({
            msg: 'error en el servidor, contacte con el administrador'
        })
    }
}

module.exports = {
    createLinkList
}
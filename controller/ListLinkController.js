const {request, response} = require('express')
const {generateLink, stringToSlug} = require('../helpers/slugGenerator')
const List = require('../model/ListModel')
const User = require('../model/UserModel')

const createLinkList = async(req = request, res = response) => {
    
    const data = req.body

    const userAuth = req.email
    
    try{

        // obtener la informacion del usuario autenticado
        const {id} = await User.findOne({where: {email: userAuth}})
        
        // se añade al arreglo de datos
        data.user_id = id

        // generar slug
        data.slug = stringToSlug(data.title)

        // generar slug de la lista
        data.url_list = generateLink(data.title, id)

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

const getListsByUser = async(req, res = response) => {

    const {id} = req.params

    try{

        const {email} = await User.findByPk(id)

        const lists = await List.findAll({
            where:{
                user_id: id,
                status:1
            }
        })

        const listsMapped = lists.map(l => {
            return {
                id: l.id,
                title: l.title,
                description: l.description,
                slug: l.slug,
                url_list: l.url_list,
                user: email,
                createdAt: l.createdAt
            }
        } )

        const total = lists.length

        res.status(200).json({
            total,
            lists:listsMapped
        })

    }catch(error){
        console.error(error)
        res.status(500).json({
            msg: 'error en el servidor, contacte con el administrador'
        })
    }

}

const updateList = async(req, res = response) => {

    const data = req.body
    const {id} = req.params
    const userAuth = req.email
    
    try{

        if(data.title){

            const {id} = await User.findOne({where: {email: userAuth}})
            
            // generar slug
            data.slug = stringToSlug(data.title)

            // generar slug de la lista
            data.url_list = generateLink(data.title, id)
        }


        const list = await List.findByPk(id)

        if(!list){
            return res.status(404).json({
                msg: 'lista no encontrada'
            })
        }

        await list.update(data)

        res.status(200).json({
            msg: 'lista actualizada corretamente',
            list
        })

    }catch(error){
        console.error(error)
        res.status(500).json({
            msg: 'error en el servidor, contacte con el administrador'
        })
    }
}


const deleteList = async(req, res = response) => {

    const {id} = req.params

    try{

        const list = await List.update({status: 0}, {where: {id:id}})

        res.status(200).json({
            msg: 'lista eliminada correctamente',
        })

    }catch(error){
        console.error(error)
        res.status(500).json({
            msg: 'error en el servidor, contacte con el administrador'
        })
    }

}

module.exports = {
    createLinkList,
    deleteList,
    getListsByUser,
    updateList
}
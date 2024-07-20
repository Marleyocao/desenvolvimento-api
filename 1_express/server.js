//const { response, request } = require('express')
// const express = require('express')
import express from "express"
import{v4 as uuidv4} from 'uuid'
const PORT = 3333

const app = express()

//Aceitar JSON
app.use(express.json())

//middleware
const logRoutes = (request, response, next)=>{
    const {url, method} = request
    const rota =`[${method.toUpperCase()}] ${url}`
    console.log(rota)
    next()
}

//middleware para todas as rotas
app.use(logRoutes)

//query params
const users = []
app.get('/users', (request,response)=>{
    response.status(200).json(users)
})

app.post('/users',(request,response)=>{
    
    const{nome,idade} = request.body

    if(!nome){
        response.status(400).json({message:'O nome é obrigatorio'})
        return
    }

    if(!idade){
        response.status(400).json({message:'A idade é obrigatoria'})
        return
    }

    const user = {
        id: uuidv4(),
        nome,
        idade
    }
    users.push(user)
    response.status(201).json({
        message:'Usuario cadastrado',
        user
    })
})

//Routes Params
app.put('/users/:id',(request,response)=>{

    const{id,cpf} = request.params
    const {nome, idade} = request.body

    const indexUser = users.findIndex((user)=> user.id == id)
    if(indexUser === -1){
        response.status(404).json({message:'Usuario não encontrado'})
        return
    }

    if(!nome || !idade){
        response.status(400).json({message:'O nome e a idade do usuarios são obrigatorios'})
        return
    }

    const updatedUser = {
        id,
        nome,
        idade
    }

    users[indexUser] = updatedUser
    response.status(200).json(updatedUser)
})

app.delete('/users',(request,response)=>{

    const id = request.params.id

    const indexUser = users.findIndex((user)=> user.id == id)
    if(indexUser === -1){
        response.status(404).json({message:'Usuario não encontrado'})
        return
    }

    users.splice(indexUser, 1)
    response.status(204).send('apagado')
})

app.listen(PORT,(error)=>{
    console.log("Servidor on PORT" + PORT)
})
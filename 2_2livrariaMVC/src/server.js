import 'dotenv/config'
import express from 'express'

//conexão com banco de dados
import conn from "./config/conn.js"

//importação dos modulos e criação das tabelas
import "./models/livroModel.js"
import "./models/funcionarioModel.js"

const PORT = process.env.PORT

const app = express()

app.get("/",(req,res)=>{
    res.send("Servidor on port " + PORT)
})
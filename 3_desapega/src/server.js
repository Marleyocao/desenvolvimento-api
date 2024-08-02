import "dotenv/config"
import express from "express"
import path from "node:path"
import { fileURLToPath } from "node:url"

const PORT = process.env.PORT

//importar conexão
import conn from "./config/conn.js"

//importação dos modulos (tabela)
import "./models/usuarioModel.js"

//importtar as rotas
import usuarioRouter from "./routes/usuarioRoutes.js"

const app = express()


app.get("/", (req, res)=>{
    res.send("oi")
})

app.listen(PORT, ()=>{
    console.log("sevidor on PORT "+ PORT)
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


app.use(express.urlencoded({extended:true}))
app.use(express.json());



//localizar onde esta a pasta public
app.use("/public", express.static(path.join(__dirname,"public")))

//utilizar a rota
app.use('/usuarios', usuarioRouter)

//404
app.use((req, res)=>{
    res.status(404).json({message:"recurso não entrado"})
})



/*
404
app.get("*", (req, res)=>{
    res.send("oi")
}) */

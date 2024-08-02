import conn from "../config/conn.js";
import bcrypt from "bcrypt"
import {v4 as uuidv4} from "uuid"
import jwt from "jsonwebtoken";

//helpers
import createUserToken from "../helpers/create-user-token.js";
import getToken from "../helpers/get-token.js";
import { response } from "express";
import getUserByToken from "../helpers/get-user-bytoken.js";

export const register = (req, res) =>{
    const {nome, email, telefone, senha, confirmsenha} = req.body;

    const checkEmailSQL =/*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`;
    const checkEmailData = ["email", email]
    conn.query(checkEmailSQL, checkEmailData, async(err, data)=>{
        if(err){
            console.log(err)
            res.status(500).json({err: "Não foi possivel buscar um usuario"})
            return
        }
        if(data.length >0){
            res.status(409).json({err: "E-mail já está em uso"})
            return
        }

        //CRIAR A SENHA DO USER
        const salt = await bcrypt.genSalt(12)
        const senhaHash = await bcrypt.has(senha, salt)
        //console.log(salt)
        //console.log("Senha recebida: ",senha)
        //console.log("Senha Criptografada ",senhaHash)


        //CADASTRAR USUARIO
        const id = uuidv4()
        const imagem = "userDefault.png"

        const insertSql = /*sql*/ `INSERT INTO usuarios
            (??,??,??,??,??,??) VALUES(?,?,?,?,?,?)
        `
        const insertDATA = ["usario_id", "nome", "email", "telefone", "senha", "imagem",
        id,nome,email,telefone,senhaHash,imagem]
        conn.query(insertSql, insertDATA,(err)=>{
            if(err){
                console.error(err)
                res.status(500).json({err: "Erro ao cadastrar usuario"})
                return
            }

            usuarioSql =/*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`
            usuarioData =["usuario_id", id]
            conn.query(usuarioSql,usuarioData, async(err, data)=>{
                if(err){
                    console.error(err)
                    res.status(500).json({err:" Erro ao selecionar usuario"})
                    return
                }
                const usuario = data[0]

                try {
                    await createUserToken(usuario, req, res)
                } catch (error) {
                    console.error(error)
                }
            })
            //Usuario esteja logado na aplicação
            // createUserToken()
            res.status(201).json({message:"usuario cadastrado"})
        })

        //res.send("chegou aqui")
    })
}

//Login
export const login = (req, res)=>{
    const {email,senha} = req.body

    //validações
    if(!email){
        res.status(400).json({err:"O email é obrigatorio"})
    }

    if(!senha){
        res.status(400).json({err:"A senha é obrigatorio"})
    }

    const checkSql = /*sql*/ `SELECT*FROM usuarios WHERE ?? = ?`
    const checkData = ['email', email]
    conn.query(checkSql,checkData, async (err, data)=>{
        if(err){
            console.log(err)
            res.status(500).json({err:"Erro ao buscar usuario"})
            return
        }

        if(data.length === 0){
            res.status(404).json({err:"Usuario não encontrado"})
            return
        }

        const usuario = data[0]

        //Verificar se a senha existe/comparar senha
        const compararSenha = await bcrypt.compare(senha, usuario.senha)
        //console.log("senha do usuario",senha)
        //console.log("senha do Objeto",usuario.senha)
        //console.log("comparar senha",compararSenha)
        if(!compararSenha){
            return res.status(401).json({message:"Senha Invalida"})
        }

        try{
            await createUserToken(usuario,req,res)
        } catch (error){
            console.error(error)
            res.status(500).json({err:"Erro ao precessar informação"})
        }

    })
}

//Verificar usuario
export const checkUser = (req,res)=>{
    let usuarioAtual

    //criar um helper para fazer a verificação
    if(req.headers,authorization){

        const token = getToken(req)

        const decoded = jwt.decode(token, "SENHASUPERSEGURAEDIFICIL" )
    
        const usuarioId = decoded.id

        const checkSql =/*sql*/ `SELECT*FROM usuarios WHERE ?? = ?`
        const checkData =["usuario_id", usuarioId]
        conn.query(checkSql, checkData,(err,data)=>{
            if(err){
                console.error(err)
                res.status(500).json({err:"Erro ao verificar usuario"})
                return
            }
            usuarioAtual = data[0]
            res.status(200).json(usuarioAtual)
        })
    }else {
        usuarioAtual = null
        response.status(200).json(usuarioAtual)
    }
}

export const getUserById = (req,res) =>{
    const {id} = req.params

    const checkSql =/*sql*/ `SELECT usuario_id,nome,email,telefone,imagem
    FROM usuarios
    WHERE ?? = ?
    `
    const checkData = ["usuario_id", id]
    conn.query(checkSql, checkData, (err,data)=>{
        if(err){
            console.error(err)
            res.status(500).json({err:"Erro ao buscar usuario"})
        }
        if(data.length === 0){
            res.status(404).json({err:"usuario não encontrado"})
            return
        }

        const usuario = data[0]
        res.status(200).json(usuario)
    })
}

export const editUser = async (req,res) =>{
    const {id} = req.params

    //verificar se o usuario esta logado
    try {
        const token = getToken(req)
        const user = await getUserByToken(token)

        const {nome,email,telefone} = req.body

        if(!nome){
            return res.status(400).json({message:"O nome é Obrigatorio"})
        }
        if(!email){
            return res.status(400).json({message:"O Email é Obrigatorio"})
        }
        if(!telefone){
            return res.status(400).json({message:"O telefone é Obrigatorio"})
        }

        const checkSql = /*sql*/ `SELECT * FROM usuarios WHERE ?? = ?`
        const checkData = ["usuario_id", id]
        conn.query(checkSql, checkData,(err, data)=>{
            if(err){
                res.status(500).json({err:"Erro ao buscar usuario"})
                return
            }

            if(data.length ===0){
                res.status(404).json({err:"Usuario não encontrado"})
                return
            }

            //validação de usuario de banco é o mesmo do token

            //verifique se o email já esta em uso
            const checkEmailSQL =/*sql*/ `SELECT*FROM usuarios WHERE ?? = ? AND ?? != ?`
            const checkEmailData = ["email", email, "usuario_id", id]
            conn.query(checkEmailData, checkEmailSQL, (err, data)=>{
                if(err){
                    console.log(err)
                    res.status(500).json({err:"Erro ao buscar email"})
                    return
                }
                if(data.length > 0){
                    res.status(409).json({err:"E-mail ja esta em uso"})
                }

                const updatedSql = /*sql*/ `UPDATE usuarios SET ? WHERE ?? = ?`
                const updateData = [{nome,email,telefone}, "usuario_id", id]
                conn.query(updatedSql, updateData, (err)=>{
                    if(err){
                        res.status(500).json({err:"Erro ao atualzar usuario"})
                        return
                    }

                    res.status(200).json({message: "Usuario Atualizado"})
                })
            })

        })

    } catch (error) {
        res.status(500).json('err')
    }
}
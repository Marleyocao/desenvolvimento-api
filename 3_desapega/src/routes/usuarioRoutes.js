import { Router } from "express";


//importar Controllers de usuario
import {register, login, checkUser,getUserById,editUser,} from "../controllers/usuarioController.js"

//importar os helpers
import validarUsuario from "../helpers/validar-user.js";
import verifyToken from "../helpers/verify-token.js"

const router = Router()


//localhost:3333/usuarios/register
router.post("/register",validarUsuario, register)
router.post("/login", login)
router.get("/checkuser",checkUser)//Auxiliar o front end
router.get("/:id", getUserById)
//verificar se esta logado e upload de imagem para perfil
router.put("/edit/:id", verifyToken,editUser)

export default router
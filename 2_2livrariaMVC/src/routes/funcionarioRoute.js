import { Router } from "express";

//import controllers
import {getFuncionario, cadastrarFuncionario,buscarfuncionario,editarFuncionario,deletarfuncionario} from "../controllers/funcionarioControlle";

const router = Router();

router.get("/", getFuncionario);
router.post("/criar", cadastrarFuncionario)
router.get("/:id", buscarfuncionario)
router.put("/editar/:id",editarFuncionario)
router.delete("/remover/:id", deletarfuncionario)

export default router




/*nome da tabela clientes
 email,senha,nome*/
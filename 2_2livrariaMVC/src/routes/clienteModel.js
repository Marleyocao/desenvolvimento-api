import { Router } from "express";

//import controllers
import {ListarClientes, cadastrarCliente,buscarUnicoCliente,editarCliente} from "../controllers/clienteController";

const router = Router();

router.get("/", ListarClientes);
router.post("/criar", cadastrarCliente)
router.get("/:id", buscarUnicoCliente)
router.put("/editar/:id",editarCliente)

export default router




/*nome da tabela clientes
 email,senha,nome*/
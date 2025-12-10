import express from "express";
import usuarioController from "../controllers/usuarioController.js";
import { validar } from "../middlewares/validar.js"; 
import { usuarioSchema } from "../schemas/usuarioSchema.js"; 

const router = express.Router();

router
    .get("/users", usuarioController.listarUsuarios) 
    .get("/users/:id", usuarioController.listarUsuarioPorId)
    .post("/users", validar(usuarioSchema), usuarioController.cadastrarUsuario)
    .put("/users/:id", validar(usuarioSchema), usuarioController.atualizarUsuario)
    .delete("/users/:id", usuarioController.excluirUsuario); 

export default router;
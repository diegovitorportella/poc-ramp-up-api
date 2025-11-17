import express from "express";
import usuarioController from "../controllers/usuarioController.js";
import paginar from "../middlewares/paginar.js";

const router = express.Router();

router
    .get("/users", usuarioController.listarUsuarios, paginar)
    .get("/users/:id", usuarioController.listarUsuarioPorId)
    .post("/users", usuarioController.cadastrarUsuario)
    .put("/users/:id", usuarioController.atualizarUsuario)
    .delete ("/users/:id", usuarioController.excluirUsuario)

export default router;
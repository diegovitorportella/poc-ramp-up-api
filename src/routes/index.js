import express from "express";
import usuario from "./usuariosRoutes.js";

//middlewares
const routes = (app) => {
    app.route("/").get((req, res)=>{
        res.status(200).send("API de Cadastro de Usuários")
    });

    app.use(express.json(), usuario);
};

export default routes;
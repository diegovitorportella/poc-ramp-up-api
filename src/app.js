import express from "express";
import { sequelize } from "./models/index.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const app = express();

app.use(express.json());

try {
  await sequelize.authenticate();
  console.log("Conexão com o PostgreSQL (Sequelize) estabelecida com sucesso.");

  await sequelize.sync({ alter: true }); 
  console.log("Tabelas sincronizadas.");
  
} catch (erro) {
  console.error("Erro fatal ao conectar ou sincronizar o banco:", erro);
}

routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;
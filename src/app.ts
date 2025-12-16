import express, { Express } from "express";
import { sequelize } from "./models/index";
import routes from "./routes/index";
import errorHandler from "./middlewares/errorHandler";
import notFoundHandler from "./middlewares/notFoundHandler";

const app: Express = express();

app.use(express.json());

// Função auto-executável para conexão assíncrona
(async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connection established successfully.");

    await sequelize.sync({ alter: true }); 
    console.log("Tables synchronized.");
    
  } catch (error) {
    console.error("Fatal error connecting or syncing database:", error);
  }
})();

routes(app);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
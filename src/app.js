import express from "express";
import conectaNaDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await conectaNaDataBase();

conexao.on("error", (erro) => {
    console.error("erro de conexão", erro);
});

conexao.once("open", ()=>{
    console.log("Conexao com o banco feita com sucesso")
});

const app = express();
app.use(express.json());
routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros);

export default app;

//mongodb+srv://admin:admin123@cluster0.px7nsf5.mongodb.net/?appName=Cluster0
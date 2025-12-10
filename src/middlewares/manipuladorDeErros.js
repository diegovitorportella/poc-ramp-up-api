import ErroBase from "../erros/ErroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import { ValidationError, UniqueConstraintError, DatabaseError, BaseError } from "sequelize"; 

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(erro, req, res, next) {
    
    // 1. Erros de validação do Sequelize
    if (erro instanceof ValidationError || erro instanceof UniqueConstraintError) {
        const mensagensErro = erro.errors.map(err => err.message).join("; ");
        new RequisicaoIncorreta(`Erros de validação: ${mensagensErro}`).enviarResposta(res);
    } 
    // 2. Erros de Banco de Dados (ex: ID inválido no Postgres)
    else if (erro instanceof DatabaseError) {
        if (erro.parent && erro.parent.code === '22P02') { 
             new RequisicaoIncorreta("Formato de ID ou tipo de dado inválido.").enviarResposta(res);
        } else {
            new ErroBase(`Erro de Banco de Dados: ${erro.message}`).enviarResposta(res);
        }
    }
    // 3. Erros da nossa aplicação (Herança de ErroBase cobre NaoEncontrado e RequisicaoIncorreta)
    else if (erro instanceof ErroBase) {
        erro.enviarResposta(res);
    } 
    // 4. Erros genéricos do Sequelize
    else if (erro instanceof BaseError) { 
        new ErroBase(`Erro interno do servidor (Sequelize): ${erro.message}`).enviarResposta(res);
    }
    // 5. Erro Genérico final
    else {
        console.error(erro); 
        new ErroBase().enviarResposta(res);
    }
}

export default manipuladorDeErros;
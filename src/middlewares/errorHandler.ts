import { Request, Response, NextFunction } from 'express';
import { ValidationError, UniqueConstraintError, DatabaseError, BaseError as SequelizeBaseError } from "sequelize"; 
import BaseError from "../errors/BaseError";
import BadRequestError from "../errors/BadRequestError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
    
    // 1. Erros de validação do Sequelize
    if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        const errorMessages = error.errors.map(err => err.message).join("; ");
        new BadRequestError(`Validation errors: ${errorMessages}`).sendResponse(res);
        return; // Encerra a execução aqui
    } 

    // 2. Erros de Banco de Dados
    if (error instanceof DatabaseError) {
        // Tipagem segura para acessar propriedades do erro original
        const parentError = (error as any).parent;
        
        if (parentError && parentError.code === '22P02') { 
             new BadRequestError("Invalid ID format or data type.").sendResponse(res);
        } else {
            new BaseError(`Database Error: ${error.message}`).sendResponse(res);
        }
        return; // Encerra a execução aqui
    }

    // 3. Erros da nossa aplicação
    if (error instanceof BaseError) {
        error.sendResponse(res);
        return; // Encerra a execução aqui
    } 

    // 4. Erros genéricos do Sequelize
    if (error instanceof SequelizeBaseError) { 
        new BaseError(`Internal Server Error (Sequelize): ${error.message}`).sendResponse(res);
        return; // Encerra a execução aqui
    }

    // 5. Erro Genérico final (se chegou aqui, é porque não caiu em nenhum if anterior)
    console.error(error); 
    new BaseError().sendResponse(res);
}

export default errorHandler;
import { Request, Response, NextFunction } from 'express';
import { ValidationError, UniqueConstraintError, DatabaseError, BaseError as SequelizeBaseError } from "sequelize"; 
import BaseError from "../errors/BaseError";
import BadRequestError from "../errors/BadRequestError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {
    
    if (error instanceof ValidationError || error instanceof UniqueConstraintError) {
        const errorMessages = error.errors.map(err => err.message).join("; ");
        new BadRequestError(`Validation errors: ${errorMessages}`).sendResponse(res);
        return; 
    } 

    if (error instanceof DatabaseError) {
        const parentError = (error as any).parent;
        
        if (parentError && parentError.code === '22P02') { 
             new BadRequestError("Invalid ID format or data type.").sendResponse(res);
        } else {
            new BaseError(`Database Error: ${error.message}`).sendResponse(res);
        }
        return; 
    }

    if (error instanceof BaseError) {
        error.sendResponse(res);
        return;
    } 

    if (error instanceof SequelizeBaseError) { 
        new BaseError(`Internal Server Error (Sequelize): ${error.message}`).sendResponse(res);
        return; 
    }

    console.error(error); 
    new BaseError().sendResponse(res);
}

export default errorHandler;
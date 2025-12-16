import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/NotFoundError';

function notFoundHandler(req: Request, res: Response, next: NextFunction) {
    const error404 = new NotFoundError();
    next(error404);
}

export default notFoundHandler;
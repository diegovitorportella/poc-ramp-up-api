import { Request, Response, NextFunction } from 'express';
import Create from "../use-cases/users/Create";
import List from "../use-cases/users/List";
import GetById from "../use-cases/users/GetById";
import Update from "../use-cases/users/Update";
import Delete from "../use-cases/users/Delete";

class UserController {

    static listUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = await List.execute({
                query: req.query as any,
                page: req.query.page ? Number(req.query.page) : 1,
                limit: req.query.limit ? Number(req.query.limit) : 5,
                order: req.query.order ? String(req.query.order) : "id:-1"
            });
            
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    static getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await GetById.execute(Number(req.params.id));
            res.status(200).send(user);
        } catch (error) {
            next(error);
        }
    };

    static registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newUser = await Create.execute(req.body);
            res.status(201).json({ message: "User created successfully", user: newUser });
        } catch (error) {
            next(error);
        }
    };

    static updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await Update.execute(Number(req.params.id), req.body);
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    };

    static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await Delete.execute(Number(req.params.id));
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;
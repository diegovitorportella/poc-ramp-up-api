import { Request, Response, NextFunction } from 'express';
import createUserUseCase from "../use-cases/CreateUserUseCase";
import listUsersUseCase from "../use-cases/ListUsersUseCase";
import getUserByIdUseCase from "../use-cases/GetUserByIdUseCase";
import updateUserUseCase from "../use-cases/UpdateUserUseCase";
import deleteUserUseCase from "../use-cases/DeleteUserUseCase";

class UserController {

    static listUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await listUsersUseCase.execute({
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
            const user = await getUserByIdUseCase.execute(Number(req.params.id));
            res.status(200).send(user);
        } catch (error) {
            next(error);
        }
    };

    static registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newUser = await createUserUseCase.execute(req.body);
            res.status(201).json({ message: "User created successfully", user: newUser });
        } catch (error) {
            next(error);
        }
    };

    static updateUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await updateUserUseCase.execute(Number(req.params.id), req.body);
            res.status(200).send(response);
        } catch (error) {
            next(error);
        }
    };

    static deleteUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await deleteUserUseCase.execute(Number(req.params.id));
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;
import { Router } from "express";
import UserController from "../controllers/UserController";
import { validate } from "../middlewares/validate"; 
import { userSchema } from "../schemas/userSchema"; 

const router = Router();

router
    .get("/users", UserController.listUsers) 
    .get("/users/:id", UserController.getUserById)
    .post("/users", validate(userSchema), UserController.registerUser)
    .put("/users/:id", validate(userSchema), UserController.updateUser)
    .delete("/users/:id", UserController.deleteUser); 

export default router;
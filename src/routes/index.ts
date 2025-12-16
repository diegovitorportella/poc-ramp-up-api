import express, { Express, Request, Response } from "express";
import userRoutes from "./userRoutes";

const routes = (app: Express) => {
    app.route("/").get((req: Request, res: Response) => {
        res.status(200).send("User Registration API");
    });

    app.use(express.json(), userRoutes);
};

export default routes;
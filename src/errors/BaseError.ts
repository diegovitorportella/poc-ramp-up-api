import { Response } from 'express';

class BaseError extends Error {
    public message: string;
    public status: number;

    constructor(message: string = "Internal Server Error", status: number = 500) {
        super();
        this.message = message;
        this.status = status;
    }

    public sendResponse(res: Response): void {
        res.status(this.status).send({
            message: this.message,
            status: this.status
        });
    }
}

export default BaseError;
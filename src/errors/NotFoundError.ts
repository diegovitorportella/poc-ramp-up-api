import BaseError from "./BaseError";

class NotFoundError extends BaseError {
    constructor(message: string = "Page not found") {
        super(message, 404);
    }
}

export default NotFoundError;
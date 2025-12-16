import BaseError from "./BaseError";

class BadRequestError extends BaseError {
    constructor(message: string = "One or more provided data are incorrect") {
        super(message, 400);
    }
}

export default BadRequestError;
import { CustomError } from "./custom-error.js";

export class NotAuthrizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super("Not Authorized");

        Object.setPrototypeOf(this, NotAuthrizedError.prototype);
    }

    serializeErrors() { 
        return [{message: "Not Authorized"}]
    }
}
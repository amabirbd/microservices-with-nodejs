import express, { Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error.js';
import { DatabaseConnectionError } from '../errors/database-connection-error.js';

const router = express.Router()

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be vlaid'),
    body('password')
        .trim()
        .isLength({ min:2, max: 20})
        .withMessage('Password must be between 2 and 20 charcter')
],
 (req: Request, res: Response) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new RequestValidationError(errors.array())
    }

    const { email, password } = req.body;

    console.log("Creating a user..")

    throw new DatabaseConnectionError();


    res.send({})
});

export { router as signupRouter}
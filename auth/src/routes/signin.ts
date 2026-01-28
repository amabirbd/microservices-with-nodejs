import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request.js';
import { User } from '../models/user.js';
import { BadRequestError } from '../errors/bad-request-error.js';
import { Password } from '../services/password.js';
import jwt from 'jsonwebtoken';

const router = express.Router()

router.post('/api/users/signin',[
    body('email')
        .isEmail()
        .withMessage("email must be valid"),
    body('password')
        .trim()
        .notEmpty()
        .withMessage("you must provide a password")
] ,
validateRequest,
 async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({email});


    if (!existingUser) {
        throw new BadRequestError("Invalid Credentials");
    }

    const passwordMatch = await Password.compare(existingUser.password, password);
    
    if (!passwordMatch) {
        throw new BadRequestError("Invalid Credentials");
    }

     // genereate jwt
     const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!) 

    // store it on the session object
    req.session = {
        jwt: userJwt
    }

    res.status(200).send(existingUser)

});

export { router as signinRouter}
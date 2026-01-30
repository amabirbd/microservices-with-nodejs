import express, { Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '@amabirbdticketing/ticketing-common-amabirbd';
import { User } from '../models/user.js';
import { BadRequestError } from '@amabirbdticketing/ticketing-common-amabirbd';
import jwt from 'jsonwebtoken';
import { validateRequest } from '@amabirbdticketing/ticketing-common-amabirbd';

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
validateRequest,
 async (req: Request, res: Response) => {


    const { email, password } = req.body;

    const existingUser = await User.findOne({
        email: email
    })

    console.log(existingUser)

    if(existingUser) {
        throw new BadRequestError("email in use")
    }

    const user = User.build({email, password})

    await user.save();

    // genereate jwt
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    }, process.env.JWT_KEY!)

    // store it on the session object
    req.session = {
        jwt: userJwt
    }

    res.status(201).send(user)
});

export { router as signupRouter}
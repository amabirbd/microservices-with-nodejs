import express from "express";
import { json } from "express";
import { signinRouter } from "./routes/signin.js";
import { signupRouter } from "./routes/signup.js";
import { signoutRouter } from "./routes/signout.js";
import { currentuserRouter } from "./routes/current-user.js";
import { errorHandler } from '@amabirbdticketing/ticketing-common-amabirbd';
import { NotFoundError } from '@amabirbdticketing/ticketing-common-amabirbd';
import mongoose from "mongoose";
import cookieSession from 'cookie-session';


const app = express();
app.set('trust proxy', true)
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)

app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(currentuserRouter)

// app.get("/*", () => {
//     throw new NotFoundError()
// })

app.use(async (req, res, next) => {
    throw new NotFoundError();
  });

app.use(errorHandler)

export { app };
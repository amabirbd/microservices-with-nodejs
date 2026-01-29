import express from "express";
import { json } from "express";
import { signinRouter } from "./routes/signin.js";
import { signupRouter } from "./routes/signup.js";
import { signoutRouter } from "./routes/signout.js";
import { currentuserRouter } from "./routes/current-user.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { NotFoundError } from "./errors/not-found-error.js";
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

const start = async () => {
  if(!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }
  try{
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
  } catch (err) {
    console.error(err)
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!????!!!!');
});

}

start();
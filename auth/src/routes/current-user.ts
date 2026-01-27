import express from 'express';

const router = express.Router()

router.get('/api/users/currentuser', (req, res) => {
    res.send("Hi from user/auth router..")
});

export { router as currentuserRouter}
import express from 'express';

const router = express.Router()

router.post('/api/users/signout', (req, res) => {
    res.send("Hi from user/auth router..")
});

export { router as signoutRouter}
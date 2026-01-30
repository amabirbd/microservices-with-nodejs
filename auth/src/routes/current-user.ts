import express from 'express';
import { currentUser } from '@amabirbdticketing/ticketing-common-amabirbd';
import { requireAuth } from '@amabirbdticketing/ticketing-common-amabirbd';

const router = express.Router()

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
    res.send({currentUser: req.currentUser || null })
});

export { router as currentuserRouter}
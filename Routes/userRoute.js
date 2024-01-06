import express from 'express';
import { authUser, registerUser } from '../Controllers/userController.js';
import {protect,admin} from '../Middleware/authMiddleware.js'

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser)


export default router
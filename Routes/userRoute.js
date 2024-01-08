import express from 'express';
import { authUser, registerUser,getUserByID } from '../Controllers/userController.js';
import {protect,admin} from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/login', authUser);
router.post('/register', registerUser);
router.get('/:id',getUserByID)


export default router
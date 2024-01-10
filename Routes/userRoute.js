import express from 'express';
import { getUserByID } from '../Controllers/userController.js';
import { authenticateUser,createUser } from '../Service/userService.js';

const router = express.Router();

router.post('/login', authenticateUser);
router.post('/register', createUser);
router.get('/:id',getUserByID)


export default router
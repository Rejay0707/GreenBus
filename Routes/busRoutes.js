import express from 'express';
import {protect,admin} from '../middleware/authMiddleware.js';
import { generateBus } from '../Controllers/busController.js';

const router=express.Router();

router.post('/bus',protect,admin,generateBus)

export default router
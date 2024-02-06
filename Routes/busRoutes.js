import express from 'express';
import {protect,admin} from '../middleware/authMiddleware.js';
import { generateBus } from '../Controllers/busController.js';
import {busInformation} from '../middleware/busMiddleware.js';

const router=express.Router();

router.post('/bus',protect,admin,generateBus,busInformation)

export default router
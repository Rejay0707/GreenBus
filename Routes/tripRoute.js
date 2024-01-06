import express from 'express';
import {protect,admin} from '../Middleware/authMiddleware.js';
import { checkBusOwnership } from '../Middleware/busMiddleware.js';
import { establishJourney } from '../Controllers/tripController.js';

const router = express.Router();

router.post('/trip', protect, admin, checkBusOwnership, establishJourney)

export default router
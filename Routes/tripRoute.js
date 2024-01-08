import express from 'express';
import {protect,admin} from '../middleware/authMiddleware.js';
import { checkBusOwnership } from '../middleware/busMiddleware.js';
import { establishJourney,SearchBus } from '../Controllers/tripController.js';


const router = express.Router();

router.post('/trip', protect, admin, checkBusOwnership, establishJourney)
router.get('/search', SearchBus)


export default router
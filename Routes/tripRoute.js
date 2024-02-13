import express from 'express';
import {protect,admin} from '../middleware/authMiddleware.js';
import { checkBusOwnership,validateAvailableSeats } from '../middleware/busMiddleware.js';
import { establishJourney,FindBus } from '../Controllers/tripController.js';
import { tripInformation,searchInformation } from '../middleware/tripMiddleware.js';


const router = express.Router();

router.post('/trip', protect, admin,tripInformation, checkBusOwnership,validateAvailableSeats, establishJourney)
router.get('/search',searchInformation, FindBus)


export default router
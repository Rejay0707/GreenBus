import express from 'express'
import {bookTrip, cancelTicket} from '../Controllers/ticketController.js'
import { checkAuthDetails } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/ticket/:trip_id', bookTrip)

router.route('/:id').put(checkAuthDetails,cancelTicket)

export default router
import express from 'express'
import {bookTrip, cancelTicket} from '../Controllers/ticketController.js'
import { checkAuthDetails } from '../middleware/authMiddleware.js';
import {ticketInformation} from '../middleware/ticketMiddleware.js'
import {validatePassengerSeats,ensureUniquePassengerSeats} from '../middleware/busMiddleware.js'

const router = express.Router();

router.post('/ticket/:trip_id', bookTrip,ticketInformation,validatePassengerSeats,ensureUniquePassengerSeats)

router.route('/:id').put(checkAuthDetails,cancelTicket)

export default router
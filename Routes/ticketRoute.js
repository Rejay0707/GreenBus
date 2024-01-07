import express from 'express'
import {bookTrip, cancelTicket} from '../Controllers/ticketController.js'

const router = express.Router();

router.post('/ticket/:trip_id', bookTrip)

router.route('/:id').put(cancelTicket)

export default router
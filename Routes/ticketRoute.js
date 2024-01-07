import express from 'express'
import {bookTrip, getTicketById, getAllTickets, cancelTicket} from '../Controllers/ticketController.js'

const router = express.Router();

router.post('/ticket/:trip_id', bookTrip)
router.get('', getAllTickets)
router.route('/:id').get(getTicketById).put(cancelTicket)

export default router
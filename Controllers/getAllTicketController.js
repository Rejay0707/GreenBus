import Ticket from "../models/ticketModel.js";
import { userId } from "../middleware/authMiddleware.js";

const getAllTicket = async (req, res) => {
    try {

        const user_id = userId(req)
        const tickets = await Ticket.find({ user_id: user_id });

		if (!tickets.length) {
            return res.status(404).json({ message: 'Tickets not found' });
        } else {
            return res.status(200).json(tickets)
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

export {getAllTicket}
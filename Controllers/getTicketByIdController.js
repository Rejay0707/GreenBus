
import Ticket from "../models/ticketModel.js";

const getTicketById = async (req, res) => {
	try {
		const ticket = await Ticket.findOne({ ticket_Id: req.params.ticket_id });

		if (ticket) {
            return res.status(200).json(ticket);
        } else {
            return res.status(404).json({ message: 'Tickets not found' });
        }
		
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

export {getTicketById}
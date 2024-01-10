
import Ticket from "../models/ticketModel.js";

const getTicketById = async (req, res) => {
	try {
		const ticket = await Ticket.findById(req.params.id);
		console.log(ticket)

		if (ticket) {
            return res.status(200).json(ticket);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
		
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

export {getTicketById}
import { userId } from "../middleware/authMiddleware.js";
import {searchTrip, developTicket, checkSeat, UpdateTrip,cancel,update } from '../Service/ticketService.js';



const bookTrip = async(req, res) => {
    const { passengers } = req.body;
    const { trip_id } = req.params;
    // console.log(passengers,trip_id)

    try {
        
        const trip = await searchTrip(trip_id);
        // console.log(trip)

        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        const user_id = userId(req);
        const busNumber = trip.busNumber;
        const bookingDate = new Date();
        const numberOfSeats = passengers.length;
        const date = trip.date;
        const departureTime = trip.departureTime;
        const arrivalTime = trip.arrivalTime;
        const origin = trip.origin;
        const destination = trip.destination;
        const totalPrice = passengers.length * trip.price;

        const seatNumbers = passengers.map(passenger => passenger.seatNumber);


        const seatExists = await checkSeat(trip_id, seatNumbers)
        // console.log(seatExists)

    if (seatExists) {
        return res.status(400).json({ error: 'Seat already booked' });
    }
    
        const ticket = await  developTicket(user_id, trip_id, busNumber, bookingDate, passengers, numberOfSeats, date, departureTime, arrivalTime, origin, destination, totalPrice);
        // console.log(ticket)

        const updateTrip =  UpdateTrip(trip_id, numberOfSeats, seatNumbers);

        if (!updateTrip) {
            return res.status(500).json({ message: 'Cannot update trip' });
        }

        res.status(200).json({
            user_id: ticket.user_id,
            trip_id: ticket.trip_id,
            busNumber: ticket.busNumber,
            bookingDate: ticket.bookingDate,
            passengers: ticket.passengers,
            numberOfSeats: ticket.numberOfSeats,
            date: ticket.date,
            departureTime: ticket.departureTime,
            arrivalTime: ticket.arrivalTime,
            origin: ticket.origin,
            destination: ticket.destination,
            totalPrice: ticket.totalPrice
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};




const cancelTicket = async (req, res) => {

    try {
        const ticket = await cancel(req.params.id)

        if(ticket){
            const seatNumbers = ticket.passengers
            const seatNo = seatNumbers.map(passenger => passenger.seatNumber);
            if(!ticket.isBooked){
                return res.status(400).json({
                    message: "Ticket Already Canceled"
                })
            }
            const trip = await update(ticket.trip_id, ticket.numberOfSeats, seatNo)

            if(!trip) {
            return res.status(404).json({
                    message: "Trip Not Found"
                })
            }
            ticket.isBooked = false
            await ticket.save();
            return res.status(200).json(ticket)
        } else {
            return res.status(404).json({
                message: "Ticket Not Found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Invalid Ticket ID"
        })
    }

    
}

export { bookTrip , cancelTicket }
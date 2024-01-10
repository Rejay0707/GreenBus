import { userId } from "../middleware/authMiddleware.js";
import {searchTrip, developTicket, checkSeat, UpdateTrip } from '../Service/ticketService.js';
import Ticket from "../models/ticketModel.js";
import Trip from '../models/tripModel.js';
import { ticketInformation } from "../middleware/ticketMiddleware.js";

const bookTrip = async (req, res) => {
    const { passengers } = req.body;
    const { trip_id } = req.params;

    try {
        // if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
        //     return res.status(400).json({ "error": 'Invalid passengers data' });
        // }
        const { error } = await ticketInformation(req.body)
            if(error){
                return res.status(400).json({
                    "message": "Invalid passenger data"
                })
            }

        const trip = await searchTrip(trip_id);

        if (!trip) {
            return res.status(404).json({ "error": 'Trip not found' });
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

    if (seatExists) {
        return res.status(400).json({ "error": 'Seat already booked' });
    }
    
        


        const ticket = await developTicket(user_id, trip_id, busNumber, bookingDate, passengers, numberOfSeats, date, departureTime, arrivalTime, origin, destination, totalPrice);

        const updateTrip = await UpdateTrip(trip_id, numberOfSeats, seatNumbers);

        if (!updateTrip) {
            return res.status(500).json({ "message": 'Cannot update trip' });
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
    const ticket = await Ticket.findOne({ ticket_Id: req.params.ticket_id });

    if(ticket){
        const seatNumbers = ticket.passengers
        const seatNo = seatNumbers.map(passenger => passenger.seatNo);

        const trip = await Trip.findOneAndUpdate(
            { _id: ticket.trip_id },
            { $inc: { availableSeats: ticket.numberOfSeats }, $pull: { bookedSeats: { $in: seatNo} } },
            { new: true }
        );

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
}

export { bookTrip , cancelTicket }
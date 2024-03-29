import Ticket from "../models/ticketModel.js";
import Trip from "../models/tripModel.js";

const searchTrip = async (trip_id) => { 
    const trip = await Trip.findById(trip_id);
    return trip;
    };

    const developTicket = async (
    user_id,
    trip_id,
    busNumber,
    bookingDate,
    passengers,
    numberOfSeats,
    date,
    departureTime,
    arrivalTime,
    origin,
    destination,
    totalPrice
    ) => {
    const newTicket = await Ticket.create({
    user_id,
    trip_id,
    busNumber,
    bookingDate,
    passengers,
    numberOfSeats,
    date,
    departureTime,
    arrivalTime,
    origin,
    destination,
    totalPrice,
    });
    return newTicket;
    };

const checkSeat= async (trip_id, seatNumbers) => {
    const SeatBooked = await Trip.findOne({ _id: trip_id, bookedSeats: { $in: seatNumbers } });

    return SeatBooked
}


const UpdateTrip = async (trip_id, numberOfSeats, seatNumbers) => {
    const updatedTrip = await Trip.findOneAndUpdate(
        { _id: trip_id },
        { $inc: { availableSeats: -numberOfSeats }, $push: { bookedSeats: seatNumbers } },
        { new: true }
    );
    return updatedTrip
}

const cancel = async (id) => {
    const ticket = await Ticket.findById(id);
    return ticket
}

const update = async (trip_id, numberOfSeats, seatNumbers) => {
    console.log(seatNumbers)
    const trip = await Trip.findOneAndUpdate(
    { _id: trip_id },
    { $inc: { availableSeats: numberOfSeats }, $pull: { bookedSeats: { $in: seatNumbers} } },
    { new: true }
    );
    return trip
}


export { searchTrip, developTicket, checkSeat, UpdateTrip,cancel,update };
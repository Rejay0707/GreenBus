import Trip from '../models/tripModel.js';

const createTrip = async (
        busNumber,
        availableSeats,
        date,
        departureTime,
        arrivalTime,
        origin,
        destination,
        price
) => {
    const addTrip = await Trip.create({
        busNumber,
        availableSeats,
        date,
        departureTime,
        arrivalTime,
        origin,
        destination,
        price
    });
    return addTrip
}

const checkTrip = async (busNumber, date) => {
    const existingTrip = await Trip.findOne({
        busNumber: busNumber,
        date: date,
    });
    return existingTrip
}

const receiveTrip = async (trip_Id) => {
    const trip = await Trip.findById(trip_Id);
    return trip;
}

const findTrip = async (origin, destination, date) => {
    const trip = await Trip.find({
        origin,
        destination,
        date,
    });
    return trip;
}

export { createTrip ,checkTrip,receiveTrip,findTrip}
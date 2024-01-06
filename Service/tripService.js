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

export { createTrip }
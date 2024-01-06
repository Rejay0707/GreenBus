import Trip from '../models/tripModel.js';
import { createTrip } from '../Service/tripService.js';

const establishJourney = async (req,res) => {
    const {
        busNumber,
        availableSeats,
        date,
        departureTime,
        arrivalTime,
        origin,
        destination,
        price
    } = req.body
	try {
		const existingTrip = await Trip.findOne({
                busNumber: busNumber,
                date: date,
        });
		if(existingTrip){
			return res.status(400).json({"message": "Trip already exists"})
		} else {
            console.log("hello")
        }

        const trip = await createTrip(
            busNumber,
            availableSeats,
            date,
            departureTime,
            arrivalTime,
            origin,
            destination,
            price
        )
		return res.status(200).json({
            busNumber: trip.busNumber,
            availableSeats: trip.availableSeats,
            date: trip.date,
            departureTime: trip.departureTime,
            arrivalTime: trip.arrivalTime,
            origin: trip.origin,
            destination: trip.destination,
            price: trip.price
        })
	} catch(error) {
    
		return res.status(500).json({ 
            "message": "Internal Server Error" 
        })
	}
}

export {establishJourney}
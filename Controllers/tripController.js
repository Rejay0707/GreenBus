import Trip from '../models/tripModel.js';
import { createTrip,checkTrip,findTrip } from '../Service/tripService.js';

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
		const existingTrip = await checkTrip(busNumber, date);
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




const SearchBus = async (req,res) => {
    let origin = req.query.from;
    let destination = req.query.to;
    let date = req.query.date;

    if (!origin || !destination || !date) {
        return res.status(400).json({ "error": "Invalid parameters" });
    }

    const trip = await findTrip(origin, destination, date)

    if (!trip.length) {
        return res.status(404).json({ "message": "No available buses" });
    } else {
        return res.status(200).json(trip)
    }
}

export {establishJourney,SearchBus}
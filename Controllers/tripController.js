import { createTrip,checkTrip,findTrip } from '../Service/tripService.js';
import { tripInformation,searchInformation } from '../middleware/tripMiddleware.js';

const establishJourney = async (req,res) => {
    const { error} = await tripInformation(req.body)
    if(error){
        return res.status(400).json({
            "message" : "error.message"
        })
    }
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




const FindBus = async (req,res) => {
    let origin = req.query.from;
    let destination = req.query.to;
    let date = req.query.date;

    const {error} = await searchInformation(req.query)

    if(error){
        console.log(error)
        return res.status(401).json({
            "message" :"Invalid Parameters"
        })
    }

    const trip = await findTrip(origin, destination, date)
    console.log(trip);

    if (!trip.length) {
        return res.status(404).json({ "message": "No available buses" });
    } else {
        return res.status(200).json(trip)
    }
}

export {establishJourney,FindBus}
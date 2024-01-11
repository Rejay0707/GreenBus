
import { receiveTrip } from "../Service/tripService.js";

const getTripById = async (req, res) => {
	try {
        const trip = await receiveTrip(req.params.id)
        
		if (trip) {
            res.status(200).json(trip)
        } else {
            res.status(404).json({ 
                "message": 'Trip not found'
            });
        }
	} catch (error) {
		console.error(error.message);
		res.status(500).json({
            "message" : "Trip not found"
        });
	}
};

export {getTripById}
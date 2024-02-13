
import Bus from '../models/busModel.js';
import Joi from 'joi';

const checkBusOwnership = async (req, res, next) => {
	try{
		const bus = await Bus.findOne({busNumber: req.body.busNumber});

		if(!bus) {
			res.status(404).json({"error": "Bus not found"});
		} else {
            console.log(bus)
			if (req.user && req.user._id.toString() === bus.userId.toString()){
				next();
			} else {
				res.status(403).json({ "error": "User is not the owner of the Bus"})
			}
		}
	} catch (error) {
        res.status(400).json({
            "message":"bus already exist"
        })
    }
};

const verifyBusExistence= async (req, res, next) => {
	const { busNumber } = req.body
	const bus = await Bus.findOne({busNumber});
	if(bus){
		return res.status(400).json({
			message: "Bus already Exists"
		})
	} else {
		next();
	}
}

const validatePassengerSeats = async (req, res, next) => {
	try {
	const { passengers } = req.body;
	const tripId = req.params.trip_id;

	const trip = await Trip.findById(tripId);

	if (!trip) {
		return res.status(404).json({
		message: 'Trip Not Found'
		});
	}

	const busNumber = trip.busNumber;
	const bus = await Bus.findOne({ busNumber });
	if (!bus) {
		return res.status(404).json({
		message: 'Bus Not Found'
		});
	}

	const passengerSeatNumbers = passengers.map((passenger) => passenger.seatNo);
	const isAnySeatInvalid = passengerSeatNumbers.some((seat) => seat > bus.busSeats);

	if (isAnySeatInvalid) {
		return res.status(404).json({
		message: 'Invalid Seats: Some seat numbers exceed available seats on the bus.'
		});
	}

	next();
	} catch (error) {
	res.status(500).json({
		message: 'Invalid Trip Id'
	});
	}
};

const validateAvailableSeats = async (req, res, next) => {
	const { busNumber, availableSeats } = req.body;
	const bus = await Bus.findOne({ busNumber });

	if (bus.busSeats < availableSeats) {
	return res.status(404).json({
		message: `Invalid Available Seats: Must be Lower than or Equal to ${bus.busSeats}`
	});
	}
	
	next();
};

const ensureUniquePassengerSeats = (req, res, next) => {
	const { passengers } = req.body;
	const seatNumbers = passengers.map((passenger) => passenger.seatNo);
	
	const hasDuplicateSeats = new Set(seatNumbers).size !== seatNumbers.length;

	if (hasDuplicateSeats) {
	return res.status(401).json({
		message: "Duplicate Seats Detected: Please select different seats for each passenger."
	});
	}

	next();
};



//bus(validation)
const busInformation= (req,res,next) => {
	const busSchema = Joi.object({
		busNumber: Joi.string().required(),
		totalSeat: Joi.number().required(),
		isSleeper: Joi.boolean(),
	});
	const { error } = busSchema.validate(req.body);
    if(error){
        return res.status(404).json({
            message: error.message
        })
    } else {
        next();
    }
}

export { checkBusOwnership,verifyBusExistence,validatePassengerSeats,validateAvailableSeats,ensureUniquePassengerSeats,busInformation }
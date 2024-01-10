
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
            "message":"server error"
        })
    }
};

//bus(validation)
const busInformation= (data) => {
	const busSchema = Joi.object({
		busNumber: Joi.string().required(),
		totalSeat: Joi.number().required(),
		isSleeper: Joi.boolean(),
	});
	return busSchema.validate(data)
}

export { checkBusOwnership,busInformation }
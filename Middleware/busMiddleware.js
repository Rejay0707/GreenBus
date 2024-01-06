import Bus from '../models/busModel.js';

const checkBusOwnership = async (req, res, next) => {
	try{
		const bus = await Bus.findOne({busNumber: req.body.busNumber});

		if(!bus) {
			res.status(404).json({error: "Bus not found"});
		} else {
            console.log(bus)
			if (req.user && req.user._id.toString() === bus.user_id.toString()){
				next();
			} else {
				res.status(403).json({ error: "The individual does not possess ownership of the bus"})
			}
		}
	} catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

export { checkBusOwnership }
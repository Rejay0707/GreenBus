import Joi from 'joi'

const ticketInformation = (req, res, next) => {
    const schema = Joi.object({
        passengers: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            age: Joi.number().required(),
            seatNo: Joi.number().required(),
        })
        ).required(),
    });
    const { error } = schema.validate(req.body)
    if(error){
        return res.status(400).json({
            message: error.message
        })
    } else {
        next();
    }
}

export {ticketInformation}
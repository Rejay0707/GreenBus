import JoiBase from 'joi';
import JoiDate from '@hapi/joi-date';

const Joi = JoiBase.extend(JoiDate);

const tripInformation = (req,res,next) => {
    const schema = Joi.object({
        busNumber : Joi.string().required(),
        availableSeats : Joi.number().required(),
        date : Joi.date().required(),
        departureTime : Joi.date().format('HH:mm').required(),
        arrivalTime : Joi.date().format('HH:mm').required(),
        origin : Joi.string().required(),
        destination : Joi.string().required(),
        price : Joi.number().integer().required()
    });
    const { error } = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.message
        })
    } else {
        next();
    }
}
const searchInformation = (req,res,next) => {
    const schema = Joi.object({
        from : Joi.string().required(),
        to : Joi.string().required(),
        date : Joi.date().required()
    });
    const { error} = schema.validate(req.query)
    if(error){
        return res.status(400).json({
            message: error.message
        })
    } else {
        next();
    }
}

export {tripInformation,searchInformation}
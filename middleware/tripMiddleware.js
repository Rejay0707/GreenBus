import Joi from 'joi'

const tripInformation = (data) => {
    const schema = Joi.object({
        busNumber : Joi.string().required(),
        availableSeats : Joi.number().required(),
        date : Joi.date().required(),
        departureTime : Joi.string().required(),
        arrivalTime : Joi.string().required(),
        origin : Joi.string().required(),
        destination : Joi.string().required(),
        price : Joi.number().integer().required()
    });
    return schema.validate(data)
}
const searchInformation = (data) => {
    const schema = Joi.object({
        from : Joi.string().required(),
        to : Joi.string().required(),
        date : Joi.date().required()
    });
    return schema.validate(data)
}

export {tripInformation,searchInformation}
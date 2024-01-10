import Joi from 'joi'

const ticketInformation = (data) => {
    const schema = Joi.object({
        passengers: Joi.array().items(
        Joi.object({
            name: Joi.string().required(),
            age: Joi.number().required(),
            seatNumber: Joi.number().required(),
        })
        ).required(),
    });
    return schema.validate(data)
}

export {ticketInformation}
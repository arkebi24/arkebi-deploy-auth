const Joi = require('joi');


const registerValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
        country: Joi.string().required(),
        phonenumber: Joi.string().pattern(/^[0-9]{10,15}$/).required()
    });
    const {err} = schema.valid(req.body);
    if(err) {
        return res.status(400).json({ message: "Bad request", err })
    }
    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    });
    const {err} = schema.valid(req.body);
    if(err) {
        return res.status(400).json({ message: "Bad request", err })
    }
    next();
}
module.exports = {
    registerValidation,
    loginValidation
}
const Joi = require('joi');

// validating Signup
const signupValidation = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().required(),
        username: Joi.string().min(6).max(50).required(),
        password: Joi.string().min(6).max(50).required(),
        email: Joi.string().min(6).max(50).required()
    });

    return schema.validate(data);
}

// validation login
const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(50).required(),
        password: Joi.string().min(6).max(50).required()
    });

    return schema.validate(data);
}

module.exports = {signupValidation, loginValidation};
const joi = require("joi");

const userSchema = joi.object({
     username:joi.string().min(3).max(25).required(),
     email:joi.string().email().required(),
     password:joi.string().min(6).max(20).required()
});
const LoginSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(6).required()
});
module.exports = {userSchema,LoginSchema}
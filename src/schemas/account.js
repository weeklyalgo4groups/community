const Joi = require('joi')

const common = {
  username: Joi.string().min(2).max(16).required(),
  password: Joi.string().min(6).max(32).required()
}
const signUpScheme = Joi.object(Object.assign({
  repassword: common.password,
  email: Joi.string().min(5).required()
}, common))

const signInScheme = Joi.object(common)

module.exports = {
    signUpScheme,
    signInScheme
}
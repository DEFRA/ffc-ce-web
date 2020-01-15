const Joi = require('@hapi/joi')

module.exports = Joi.object({
  actionInput: Joi.number()
    .precision(2)
    .greater(0)
    .required()
})

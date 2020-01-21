const Joi = require('@hapi/joi')

module.exports = Joi.object({
  actionInput: Joi.number()
    .greater(0)
    .required()
})

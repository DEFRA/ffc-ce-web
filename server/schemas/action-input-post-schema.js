const Joi = require('@hapi/joi')

module.exports = Joi.object({
  actionInput: Joi.string().required()
})

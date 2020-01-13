const Joi = require('@hapi/joi')

module.exports = Joi.object({
  actionId: Joi.string().required()
})

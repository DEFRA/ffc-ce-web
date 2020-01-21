const Joi = require('@hapi/joi')

module.exports = Joi.object({
  actionInput: Joi.number()
    .prefs({ convert: false })
    .greater(0)
    .precision(2)
    .required()
})

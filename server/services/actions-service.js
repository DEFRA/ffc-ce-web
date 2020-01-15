const config = require('../config')
const wreck = require('@hapi/wreck').defaults({
  timeout: config.restClientTimeoutMillis
})

async function getActions (parcelRef) {
  const response = await wreck.get(`${config.paymentUrl}/parcels/${parcelRef}/actions`, { json: true })
  console.log('actions retrieved', response.payload)
  const actions = response.payload && response.payload.actions
  return actions || []
}

module.exports = { getActions }

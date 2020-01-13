const config = require('../config')
const wreck = require('@hapi/wreck').defaults({
  timeout: config.restClientTimeoutMillis
})

async function getParcels () {
  const response = await wreck.get(`${config.paymentUrl}/parcels`, { json: true })
  console.log('parcels retrieved', response.payload)
  const parcels = response.payload && response.payload.parcels
  return parcels || []
}

module.exports = { getParcels }

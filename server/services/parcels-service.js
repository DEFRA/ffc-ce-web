const config = require('../config')
const wreck = require('@hapi/wreck').defaults({
  timeout: config.restClientTimeoutMillis
})

async function getParcels (email) {
  const response = await wreck.get(`${config.paymentUrl}/parcels`, { json: true })
  const body = response.payload && response.payload.toString()
  return JSON.parse(body)
}

module.exports = { getParcels }

const config = require('../config')
const wreck = require('@hapi/wreck').defaults({
  timeout: config.restClientTimeoutMillis
})

function bodyToParcels (body) {
  const json = body && JSON.parse(body)
  return json && json.parcels
}

async function getParcels () {
  const response = await wreck.get(`${config.paymentUrl}/parcels`, { json: true })
  const body = response.payload && response.payload.toString()
  return bodyToParcels(body) || []
}

module.exports = { getParcels }

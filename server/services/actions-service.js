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

async function getActionWithInput (parcelRef, actionId) {
  const response = await wreck.get(`${config.paymentUrl}/parcels/${parcelRef}/actions/${actionId}`, { json: true })
  return response.payload
}

module.exports = { getActions, getActionWithInput }

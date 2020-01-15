const config = require('../config')
const wreck = require('@hapi/wreck').defaults({
  timeout: config.restClientTimeoutMillis
})

function buildPayload (parcelRef, id, quantity) {
  return {
    parcelRef,
    actions: [{
      action: { id },
      options: { quantity }
    }]
  }
}

async function calculatePayment (parcelRef, actionId, quantity) {
  const result = await wreck.post(
    config.paymentCalculationUrl,
    {
      json: true,
      payload: buildPayload(parcelRef, actionId, quantity)
    }
  )
  return result.payload
}

module.exports = { calculatePayment }

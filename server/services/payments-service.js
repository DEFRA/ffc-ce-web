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
  const payload = buildPayload(parcelRef, actionId, quantity)
  console.log(`Payment Calculation: ${config.paymentCalculationUrl}, payload: `, payload)
  const result = await wreck.post(
    config.paymentCalculationUrl,
    {
      json: true,
      payload
    }
  )
  console.log('Payment Calculation: Received response ', result)
  return result.payload
}

module.exports = { calculatePayment }

const config = require('../config')
const wreck = require('@hapi/wreck').defaults({
  timeout: config.restClientTimeoutMillis
})

async function calculatePayment (payload) {
  const parsedPayload = {
    parcelRef: payload.parcelRef,
    quantity: payload.quantity
  }
  const result = await wreck.get(config.paymentCalculationUrl, { json: true, payload: parsedPayload })
  return result.payload
}

module.exports = { calculatePayment }

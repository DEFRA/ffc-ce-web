const config = require('../config')
const wreck = require('@hapi/wreck').defaults({
  timeout: config.restClientTimeoutMillis
})

async function calculatePayment (parcelRef, actionId, quantity) {
  const payloadData = JSON.stringify({ actionData: { quantity } })
  const result = await wreck.post(
    `${config.paymentUrl}/parcels/${parcelRef}/actions/${actionId}/payment-calculation`,
    {
      json: true,
      payload: payloadData
    }
  )

  return result.payload
}

module.exports = { calculatePayment }

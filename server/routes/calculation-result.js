const paymentService = require('../services/payments-service')
const paymentsModel = require('../models/payments-model')
const { getParcelRef, getActionId, getActionInput } = require('../session')

module.exports = [
  {
    method: 'GET',
    path: '/calculation-result',
    handler: async (request, h) => {
      const payment = await paymentService.calculatePayment(getParcelRef(), getActionId(), getActionInput())
      const model = paymentsModel(payment.eligible, payment.value)
      return h.view('calculation-result', { model })
    }
  }
]

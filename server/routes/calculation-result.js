const paymentService = require('../services/payments-service')
const paymentsModel = require('../models/payments-model')
const { getParcelRef, getActionId, getActionInput } = require('../session')

module.exports = [
  {
    method: 'GET',
    path: '/calculation-result',
    handler: async (request, h) => {
      const parcelRef = getParcelRef(request)
      const actionId = getActionId(request)
      const actionInput = getActionInput(request)
      const payment = await paymentService.calculatePayment(parcelRef, actionId, actionInput)
      const model = paymentsModel(payment.eligible, payment.value)
      return h.view('calculation-result', { model })
    }
  }
]

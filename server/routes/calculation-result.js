const paymentService = require('../services/payments-service')
const paymentsModel = require('../models/payments-model')
const { getParcelRef, getActionId, getActionInput, getAllActions } = require('../session')

module.exports = [
  {
    method: 'GET',
    path: '/calculation-result',
    handler: async (request, h) => {
      const parcelRef = getParcelRef(request)
      const actionId = getActionId(request)
      const allActions = getAllActions(request)
      const action = allActions.find((action) => action.id === actionId)
      const actionDescription = action ? action.description : ''
      const actionInput = getActionInput(request)
      const payment = await paymentService.calculatePayment(parcelRef, actionId, actionInput)
      const errorList = []
      const model = paymentsModel(payment.eligible, parcelRef, `${actionId}: ${actionDescription}`, payment.value, errorList)
      return h.view('calculation-result', { model })
    }
  }
]

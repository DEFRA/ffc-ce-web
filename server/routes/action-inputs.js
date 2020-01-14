const { getParcelRef, getActionId, setActionInput } = require('../session')

module.exports = [
  {
    method: 'GET',
    path: '/action-inputs',
    handler: async (request, h) => {
      const model = {
        parcelRef: getParcelRef(request),
        actionId: getActionId(request)
      }
      return h.view('action-inputs', { model })
    }
  },
  {
    method: 'POST',
    path: '/action-inputs',
    handler: function (request, h) {
      setActionInput(request, request.payload.actionInput)
      return h.redirect('/calculation-result')
    }
  }
]

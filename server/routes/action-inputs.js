const actionInputPostSchema = require('../schemas/action-input-post-schema')
const actionInputsModel = require('../models/action-inputs-model')

const { getParcelRef, getActionId, setActionInput } = require('../session')

module.exports = [
  {
    method: 'GET',
    path: '/action-inputs',
    handler: (request, h) => {
      const model = actionInputsModel(getParcelRef(request), getActionId(request))
      return h.view('action-inputs', { model })
    }
  },
  {
    method: 'POST',
    path: '/action-inputs',
    handler: function (request, h) {
      setActionInput(request, request.payload.actionInput.toString())
      return h.redirect('/calculation-result')
    },
    options: {
      validate: {
        payload: actionInputPostSchema,
        failAction: (request, h) => {
          const model = actionInputsModel(
            getParcelRef(request),
            getActionId(request),
            'You must enter a number greater than zero'
          )
          return h.view('action-inputs', { model }).takeover()
        }
      }
    }
  }
]

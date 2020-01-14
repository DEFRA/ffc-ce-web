const actionInputPostSchema = require('../schemas/action-input-post-schema')
const actionInputsModel = require('../models/action-inputs-model')

const { getParcelRef, getActionId, setActionInput } = require('../session')

module.exports = [
  {
    method: 'GET',
    path: '/action-inputs',
    handler: async (request, h) => {
      const model = actionInputsModel(getParcelRef(request), getActionId(request))
      return h.view('action-inputs', { model })
    }
  },
  {
    method: 'POST',
    path: '/action-inputs',
    handler: function (request, h) {
      setActionInput(request, request.payload.actionInput)
      return h.redirect('/calculation-result')
    },
    options: {
      validate: {
        payload: actionInputPostSchema,
        failAction: async (request, h) => {
          const model = actionInputsModel(
            getParcelRef(request),
            getActionId(request),
            'You must enter a number greater than zero with, at most, 2 decimal places'
          )
          return h.view('action-inputs', { model }).takeover()
        }
      }
    }
  }
]

const actionInputPostSchema = require('../schemas/action-input-post-schema')
const actionInputsModel = require('../models/action-inputs-model')

const { getParcelRef, getActionId, setActionInput, getAllParcelData } = require('../session')

module.exports = [
  {
    method: 'GET',
    path: '/action-inputs',
    handler: async (request, h) => {
      const parcels = getAllParcelData(request)
      const model = actionInputsModel(getParcelRef(request), getActionId(request), '', parcels)
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
        failAction: async (request, h) => {
          const parcels = getAllParcelData(request)
          const model = actionInputsModel(
            getParcelRef(request),
            getActionId(request),
            'You must enter a number greater than zero',
            parcels
          )
          return h.view('action-inputs', { model }).takeover()
        }
      }
    }
  }
]

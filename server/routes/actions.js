const actionsService = require('../services/actions-service')
const actionsModel = require('../models/actions-model')
const actionPostSchema = require('../schemas/actions-post-schema')
const { getParcelRef, setActionId, setAllActions } = require('../session')

module.exports = [
  {
    method: 'GET',
    path: '/actions',
    handler: async (request, h) => {
      const parcelRef = getParcelRef(request)
      const actions = await actionsService.getActions(parcelRef)
      setAllActions(request, actions)
      const model = actionsModel(actions, parcelRef)
      return h.view('actions', { model })
    }
  },
  {
    method: 'POST',
    path: '/actions',
    handler: function (request, h) {
      setActionId(request, request.payload.actionId)
      return h.redirect('/action-inputs')
    },
    options: {
      validate: {
        payload: actionPostSchema,
        failAction: async (request, h) => {
          const parcelRef = getParcelRef(request)
          const actions = await actionsService.getActions(parcelRef)
          const model = actionsModel(actions, parcelRef, 'You must choose an action')
          return h.view('actions', { model }).takeover()
        }
      }
    }
  }
]

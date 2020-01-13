const actionsService = require('../services/actions-service')
const actionsModel = require('../models/actions-model')
const actionPostSchema = require('../schemas/actions-post-schema')
const cacheKey = 'actionId'

module.exports = [
  {
    method: 'GET',
    path: '/actions',
    handler: async (request, h) => {
      const parcelRef = request.yar.get('parcelRef')
      const actions = await actionsService.getActions()
      const model = actionsModel(actions, parcelRef)
      return h.view('actions', { model })
    }
  },
  {
    method: 'POST',
    path: '/actions',
    handler: function (request, h) {
      request.yar.set(cacheKey, request.payload.actionId)
      return h.redirect('/action-input')
    },
    options: {
      validate: {
        payload: actionPostSchema,
        failAction: async (request, h) => {
          const actions = await actionsService.getActions()
          const parcelRef = request.yar.get('parcelRef')
          const model = actionsModel(actions, parcelRef, 'You must choose an action')
          return h.view('actions', { model }).takeover()
        }
      }
    }
  }
]

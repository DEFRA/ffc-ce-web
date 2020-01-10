const parcelService = require('../services/parcels-service')
const parcelModel = require('../models/parcels-model')
const parcelPostSchema = require('../schemas/parcels-post-schema')
const cacheKey = 'parcelRef'

module.exports = [
  {
    method: 'GET',
    path: '/parcels',
    options: {
      handler: async (request, h) => {
        const parcels = await parcelService.getParcels()
        const model = parcelModel(parcels)
        return h.view('parcels', { model })
      }
    }
  },
  {
    method: 'POST',
    path: '/parcels',
    handler: function (request, h) {
      request.yar.set(cacheKey, request.payload.parcelRef)
      return h.redirect('/actions')
    },
    options: {
      validate: {
        payload: parcelPostSchema,
        failAction: async (request, h) => {
          const parcels = await parcelService.getParcels()
          const model = parcelModel(parcels, 'You must choose a parcel')
          return h.view('parcels', { model }).takeover()
        }
      }
    }
  }
]

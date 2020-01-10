const parcelService = require('../services/parcels-service')
const parcelModel = require('../models/parcels-model')
const actionSchema = require('../schemas/action-schema')
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
        payload: actionSchema,
        failAction: async (request, h) => {
          const parcels = await parcelService.getParcels()
          console.log(parcels)
          const model = parcelModel(parcels, 'You must choose a parcel')
          return h.view('parcels', { model }).takeover()
        }
      }
    }
  }
]

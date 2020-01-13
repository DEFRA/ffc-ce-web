module.exports = [
  {
    method: 'GET',
    path: '/action-input',
    handler: async (request, h) => {
      const parcelRef = request.yar.get('parcelRef')
      const actionId = request.yar.get('actionId')
      const model = { message: `Action ${actionId} input required for parcel ${parcelRef}` }
      return h.view('action-input', { model })
    }
  }
]

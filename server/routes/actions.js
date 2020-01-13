module.exports = [
  {
    method: 'GET',
    path: '/actions',
    handler: async (request, h) => {
      const parcelRef = request.yar.get('parcelRef')
      const model = { message: `hello from actions for parcel ${parcelRef}` }
      return h.view('actions', { model })
    }
  }
]

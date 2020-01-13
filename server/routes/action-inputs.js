module.exports = [
  {
    method: 'GET',
    path: '/action-inputs',
    handler: async (request, h) => {
      const parcelRef = request.yar.get('parcelRef')
      const actionId = request.yar.get('actionId')
      const model = {
        parcelRef,
        actionId
      }
      return h.view('action-inputs', { model })
    }
  },
  {
    method: 'POST',
    path: '/action-inputs',
    handler: function (request, h) {
      return h.redirect('/calculation-result')
    }
  }
]

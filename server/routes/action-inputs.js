module.exports = [
  {
    method: 'GET',
    path: '/action-inputs',
    handler: async (request, h) => {
      const actionRef = 'FG1' // request.yar.get('parcelRef')
      const model = { actionRef }
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

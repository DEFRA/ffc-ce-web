module.exports = [
  {
    method: 'GET',
    path: '/',
    options: {
      handler: (request, h) => {
        return h.view('home')
      }
    }
  },
  {
    method: 'POST',
    path: '/',
    options: {
      handler: (request, h) => {
        return h.redirect('/parcels')
      }
    }
  }
]

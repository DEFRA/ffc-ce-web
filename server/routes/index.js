const routes = [].concat(
  require('./actions'),
  require('./healthy'),
  require('./healthz'),
  require('./home'),
  require('./parcels'),
  require('./payment'),
  require('./public')
)
module.exports = routes

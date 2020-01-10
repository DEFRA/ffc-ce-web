const routes = [].concat(
  require('./actions'),
  require('./healthy'),
  require('./healthz'),
  require('./home'),
  require('./parcels'),
  require('./public')
)
module.exports = routes

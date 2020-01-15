const routes = [].concat(
  require('./actions'),
  require('./action-inputs'),
  require('./healthy'),
  require('./healthz'),
  require('./home'),
  require('./parcels'),
  require('./public')
)
module.exports = routes

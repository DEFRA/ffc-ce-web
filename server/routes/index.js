const routes = [].concat(
  require('./actions'),
  require('./action-inputs'),
  require('./calculation-result'),
  require('./healthy'),
  require('./healthz'),
  require('./home'),
  require('./parcels'),
  require('./public')
)
module.exports = routes

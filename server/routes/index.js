const routes = [].concat(
  require('./action-input'),
  require('./actions'),
  require('./action-inputs'),
  require('./healthy'),
  require('./healthz'),
  require('./home'),
  require('./parcels'),
  require('./public')
)
module.exports = routes

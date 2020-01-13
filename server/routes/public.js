const config = require('../config')

module.exports = [{
  method: 'GET',
  path: '/robots.txt',
  handler: {
    file: 'server/public/static/robots.txt'
  },
  options: {
    cache: {
      expiresIn: config.staticCacheTimeoutMillis,
      privacy: 'private'
    }
  }
}, {
  method: 'GET',
  path: '/assets/all.js',
  handler: {
    file: 'node_modules/govuk-frontend/govuk/all.js'
  },
  options: {
    cache: {
      expiresIn: config.staticCacheTimeoutMillis,
      privacy: 'private'
    }
  }
}, {
  method: 'GET',
  path: '/assets/{path*}',
  handler: {
    directory: {
      path: [
        'server/public/static',
        'server/public/build',
        'node_modules/govuk-frontend/govuk/assets'
      ]
    }
  },
  options: {
    cache: {
      expiresIn: config.staticCacheTimeoutMillis,
      privacy: 'private'
    }
  }
}]

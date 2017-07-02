const resolve = require('path').resolve
const pkg = require('../package.json')

// For plugin-loader
exports.plugin = {
  path: resolve(__dirname, '../src/plugins'),
  plugins: '**/*.js'
}

// For view plugin
exports.view = {
  vars: {
    title: 'Community',
    version: pkg.version,
    theme: 'default'
  },
  path: resolve(__dirname, '../views')
}

// For router plugin
exports.router = {
  cwd: resolve(__dirname, '../src/routes'),
  routes: '**/*.js'
}

// For log plugin
exports.log = {
  reporters: {
    console: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{
        log: '*',
        response: '*'
      }]
    }, {
      module: 'good-console'
    }, 'stdout']
  }
}

// For db plugin
exports.db = {
  url: 'mongodb://localhost:27017/community',
  settings: {
    poolSize: 10
  },
  decorate: true
}

// For auth plugin
exports.auth = {
  key: 'nevershareyousecret',
  verifyOptions: {
    algorithm: ['HS256']
  }
}

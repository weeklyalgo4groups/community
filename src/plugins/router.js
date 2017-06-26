const router = require('hapi-router')
const resolve = require('path').resolve

module.exports = {
  register: {
    register: router,
    options: {
      cwd: resolve(__dirname, '../routes'),
      routes: '**/*.js'
    }
  }
}

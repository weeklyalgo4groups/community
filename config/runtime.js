const resolve = require('path').resolve
const plugin = require('./plugin')

module.exports = {
  connection: {
    host: '0.0.0.0',
    port: 3000
  },
  plugin,
  assets: resolve(__dirname, '../assets')
}

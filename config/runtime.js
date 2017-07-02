const resolve = require('path').resolve

module.exports = {
  connection: {
    host: '0.0.0.0',
    port: 3000
  },
  assets: resolve(__dirname, '../assets')
}

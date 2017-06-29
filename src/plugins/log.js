const good = require('good')
const plugin = require('../../config/runtime').plugin

module.exports = {
  register: {
    register: good,
    options: plugin.goodOptions || {}
  }
}

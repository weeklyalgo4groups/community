const good = require('good')
const logOptions = require('../../config/plugin').log

module.exports = {
  index: 0,
  register: {
    register: good,
    options: logOptions
  }
}

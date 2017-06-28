const good = require('good')
const goodOptions = require('../../config/runtime.js').goodOptions
module.exports = {
  register: {
    register: good,
    options: goodOptions
  }
}

const mongo = require('hapi-mongodb')
const dbOptions = require('../../config/plugin').db

module.exports = {
  index: 3,
  register: {
    register: mongo,
    options: dbOptions
  }
}

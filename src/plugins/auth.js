const jwt = require('hapi-auth-jwt2')
const authOptions = require('../../config/plugin').auth

function validate(decoded, request, callback) {
  const db = request.mongo.db

  db.collections('onlines').findOne({ id: decoded.id }, (err, result) => {
    if (err || !result) {
      return callback(null, false)
    }
    return callback(null, true)
  })
}

module.exports = {
  index: 2,
  register: jwt,
  callback: (err, server) => {

    server.auth.strategy('jwt', 'jwt', {
      key: authOptions.key,
      validateFunc: validate,
      verifyOptions: authOptions.verifyOptions
    })

    // server.auth.default('jwt')
  }
}

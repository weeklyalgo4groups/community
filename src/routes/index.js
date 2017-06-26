const runtime = require('../../config/runtime')

/**
 * Index route handler
 * @param {Object} request
 * @param {Object} reply
 * @return HTML
 */
function index(request, reply) {

  return reply.view('index')
}

// Serving static files and directories
const resource = {
  // The directory handler
  directory: {
    // The directory root path
    path: runtime.assets
  }
}

module.exports = [{
  method: 'GET',
  path: '/',
  handler: index
}, {
  method: 'GET',
  path: '/{resource*}',
  handler: resource
}]

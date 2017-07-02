const runtime = require('../../config/runtime')

// GET /
function getIndex(request, reply) {

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
  handler: getIndex
}, {
  method: 'GET',
  path: '/{resource*}',
  handler: resource
}]

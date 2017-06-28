const hapi = require('hapi')
const plugins = require('./plugins')
const runtime = require('../config/runtime')

const server = new hapi.Server()

server.connection(runtime.connection)
// Load plugins and routes
server.register(plugins, () => {

  server.views(runtime.plugin.visionOptions.views)

  server.start(err => {

    if (err) {
      return console.error(err)
    }
    console.info(`Server running at ${server.info.uri}`)
  })
})

const _ = require('lodash')
const vision = require('vision')
const nunjucks = require('nunjucks')
const router = require('hapi-router')
const viewOptions = require('../../config/plugin').view
const routerOptions = require('../../config/plugin').router

module.exports = {
  index: 4,
  register: vision,
  callback: (err, server) => {

    server.views({
      engines: {
        html: {
          compile: (src, options) => {

            const template = nunjucks.compile(src, options.environment)

            return context => template.render(context)
          },
          prepare: (options, next) => {

            const env = nunjucks.configure(options.path)

            _.forEach(viewOptions.vars, (value, key) => env.addGlobal(key, value))
            options.compileOptions.environment = env

            return next()
          }
        }
      },
      path: viewOptions.path
    })

    router.register(server, routerOptions, _.noop)
  }
}

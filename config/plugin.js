const resolve = require('path').resolve
const nunjucks = require('nunjucks')
const pkg = require('../package.json')

// For vision plugin
exports.visionOptions = {
  global: {
    title: 'Community',
    version: pkg.version
  },
  views: {
    engines: {
      html: {
        compile: (src, options) => {

          const template = nunjucks.compile(src, options.environment)

          return context => template.render(context)
        },
        prepare: (options, next) => {

          const env = nunjucks.configure(options.path, {
            watch: process.NODE_ENV === 'production' ? true : false
          })

          for (let key in exports.visionOptions.global) {
            env.addGlobal(key, exports.visionOptions.global[key]) 
          }
          options.compileOptions.environment = env

          return next()
        }
      }
    },
    path: resolve(__dirname, '../views')
  }
}

// For good plugin
exports.goodOptions = {
  reporters: {
    console: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{
        log: '*',
        response: '*'
      }]
    }, {
      module: 'good-console'
    }, 'stdout']
  }
}

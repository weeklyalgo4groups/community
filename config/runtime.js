const resolve = require('path').resolve
const nunjucks = require('nunjucks')

const views = {
  engines: {
    html: {
      compile: (src, options) => {

        const template = nunjucks.compile(src, options.environment)

        return context => template.render(context)
      },
      prepare: (options, next) => {

        options.compileOptions.environment = nunjucks.configure(options.path, {
          watch: process.NODE_ENV === 'production' ? false : true
        })

        return next()
      }
    }
  },
  path: resolve(__dirname, '../views')
}

const goodOptions = {
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

module.exports = {
  connection: {
    host: '0.0.0.0',
    port: 3000
  },
  views,
  goodOptions,
  assets: resolve(__dirname, '../assets')
}

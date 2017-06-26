const glob = require('glob')
const path = require('path')
const runtime = require('../config/runtime')

const globOptions = {
  // Do not match directories, only files
  nodir: true,
  // The current working directory in which to search
  cwd: path.resolve(__dirname, 'plugins')
}

exports.register = (server, options = {}, next) => {

  const plugins = glob.sync('**/*.js', globOptions).map(file => {

    return require(path.join(globOptions.cwd, file))
  })

  plugins.reduce((callback, plugin) => {
    
    return () => server.register(plugin.register, plugin.options || {}, err => {

      if (err) {
        return console.error(err)
      }
      callback()
    })
  }, next)()
}

exports.register.attributes = {
  name: path.basename(
    __filename,
    path.extname(__filename)
  )
}

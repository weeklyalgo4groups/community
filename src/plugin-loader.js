const _ = require('lodash')
const glob = require('glob')
const path = require('path')
const pluginOptions = require('../config/plugin').plugin

const globOptions = {
  // Do not match directories, only files
  nodir: true,
  // The current working directory in which to search
  cwd: pluginOptions.path
}

exports.register = (server, options = {}, next) => {

  const plugins = glob.sync(pluginOptions.plugins, globOptions)
    .map(file => require(path.join(globOptions.cwd, file)))
    .sort((a, b) => a.index < b.index)

  plugins.reduce((callback, plugin) => () => {

    server.register(plugin.register, plugin.options || {}, err => {

      if (_.isFunction(plugin.callback)) plugin.callback(err, server)
      callback(err)
    })
  }, next)()
}

exports.register.attributes = {
  name: path.basename(__filename, path.extname(__filename))
}

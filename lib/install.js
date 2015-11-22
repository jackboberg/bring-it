const CP = require('child_process')

module.exports = function (module, options) {
  var opts = ['install', module].concat(options)

  return CP.spawn('npm', opts)
}

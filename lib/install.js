const CP = require('child_process')

module.exports = function (module, options, done) {
  var proc = CP.spawn('npm', ['install', module].concat(options))

  proc.on('exit', done)
}

const CP = require('child_process')

module.exports = function (options, done) {
  var proc = CP.spawn('git', ['add', 'package.json'])

  proc.on('exit', done)
}

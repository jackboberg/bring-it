const Spawn = require('./spawn')

module.exports = function (module, options, done) {
  var cmd = 'npm'
  var args = ['install', module].concat(options)

  Spawn(cmd, args, {}, done)
}

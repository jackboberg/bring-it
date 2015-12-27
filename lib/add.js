const Spawn = require('./spawn')

module.exports = function (done) {
  var cmd = 'git'
  var args = ['add', 'package.json']

  Spawn(cmd, args, {}, done)
}

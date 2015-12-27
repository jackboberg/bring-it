const Util = require('util')

const Assign = require('lodash.assign')
const WinSpawn = require('win-spawn')

module.exports = function (command, args, opts, done) {
  var child = WinSpawn(command, args, Assign({ stdio: 'inherit' }, opts))

  child.on('error', done)
  child.on('close', function (code) {
    if (code === 0) done()
    else done(new Error(Util.format('non-zero exit code: %s', code)))
  })
}

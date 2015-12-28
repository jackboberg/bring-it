const Util = require('util')

const WinSpawn = require('win-spawn')
const Concat = require('concat-stream')

module.exports = function (module, done) {
  var pattern = new RegExp(Util.format('%s@\(.*\)', module))
  var child = WinSpawn('npm', ['ls', module])

  child.on('error', done)

  child.stdout.pipe(Concat({ encoding: 'string' }, function (data) {
    var matches = pattern.exec(data)

    done(null, matches ? matches[1].trim() : 'unknown')
  }))
}

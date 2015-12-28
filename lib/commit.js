const Util = require('util')

const Version = require('./version')
const Spawn = require('./spawn')

module.exports = function (module, done) {
  var name = module.split('@')[0]

  Version(name, function (err, version) {
    var msg

    if (err) return done(err)

    // TODO determine if devDepenencies
    msg = Util.format('Add %s@%s to dependencies', name, version)

    Spawn('git', ['commit', '-m', msg], done)
  })
}

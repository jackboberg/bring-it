const Spawn = require('./spawn')

module.exports = function (module, options, done) {
  Spawn('npm', ['install', module].concat(options), {}, done)
}

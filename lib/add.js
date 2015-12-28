const Spawn = require('./spawn')

module.exports = function (done) {
  Spawn('git', ['add', 'package.json'], {}, done)
}

const Series = require('run-series')

const Add = require('./add')
const Install = require('./install')

function exec (module, options, done) {
  var steps = [
    Install.bind(null, module, options),
    Add
  ]

  Series(steps, done)
}

module.exports = function (modules, options, done) {
  var steps

  if (!Array.isArray(modules)) modules = [modules]
  if (!Array.isArray(options)) options = options.split(' ')

  steps = modules.map(function (module) {
    return exec.bind(null, module, options)
  })

  Series(steps, done)
}

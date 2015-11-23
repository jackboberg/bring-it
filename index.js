const Assert = require('assert')

const Instagit = require('./lib/instagit')

function isStringOrArray (arg) {
  return typeof arg === 'string' || Array.isArray(arg)
}

function isFunction (fn) {
  return typeof fn === 'function'
}

module.exports = function (modules, options, done) {
  Assert(isStringOrArray(modules), 'modules must be String or Array')

  if (!done && isFunction(options)) {
    done = options
    options = []
  }

  Assert(isFunction(done), 'must provide callback')
  Assert(isStringOrArray(options), 'options must be String or Array')

  Instagit(modules, options, done)
}

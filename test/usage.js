const Code = require('code')
const Lab = require('lab')

const BringIt = require('..')

var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var beforeEach = lab.beforeEach
var expect = Code.expect

describe('usage', () => {
  var fn, modules, options, cb

  beforeEach((done) => {
    modules = 'test'
    options = '-D'
    cb = Function.prototype

    done()
  })

  it('exports a function', (done) => {
    expect(BringIt).to.be.a.function()
    done()
  })

  describe('modules', () => {
    it('accepts a string', (done) => {
      fn = () => BringIt('', cb)
      expect(fn).to.not.throw()

      done()
    })

    it('accepts an array', (done) => {
      fn = () => BringIt([], cb)
      expect(fn).to.not.throw()

      done()
    })

    it('requires a String or Array', (done) => {
      [void 0, null, {}, Function.prototype].forEach((el) => {
        fn = () => BringIt(el, cb)
        expect(fn).to.throw('modules must be String or Array')
      })

      done()
    })
  })

  describe('options', () => {
    it('accepts a string', (done) => {
      fn = () => BringIt(modules, '', cb)
      expect(fn).to.not.throw()

      done()
    })

    it('accepts an array', (done) => {
      fn = () => BringIt(modules, [], cb)
      expect(fn).to.not.throw()

      done()
    })
  })

  describe('done', () => {
    it('requires a callback', (done) => {
      fn = () => BringIt(modules, options)
      expect(fn).to.throw('must provide callback')

      done()
    })
  })
})

const Code = require('code')
const Lab = require('lab')
const Sinon = require('sinon')

const Instagit = require('..', {
  './lib/instagit': Sinon.stub().yields()
})

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
    expect(Instagit).to.be.a.function()
    done()
  })

  describe('modules', () => {
    it('accepts a string', (done) => {
      fn = () => Instagit('', cb)
      expect(fn).to.not.throw()

      done()
    })

    it('accepts an array', (done) => {
      fn = () => Instagit([], cb)
      expect(fn).to.not.throw()

      done()
    })

    it('requires a String or Array', (done) => {
      [void 0, null, {}, Function.prototype].forEach((el) => {
        fn = () => Instagit(el, cb)
        expect(fn).to.throw('modules must be String or Array')
      })

      done()
    })
  })

  describe('options', () => {
    it('accepts a string', (done) => {
      fn = () => Instagit(modules, '', cb)
      expect(fn).to.not.throw()

      done()
    })

    it('accepts an array', (done) => {
      fn = () => Instagit(modules, [], cb)
      expect(fn).to.not.throw()

      done()
    })

    it('requires a String or Array', (done) => {
      [void 0, null, {}, Function.prototype].forEach((el) => {
        fn = () => Instagit(modules, el, cb)
        expect(fn).to.throw('options must be String or Array')
      })

      done()
    })
  })

  describe('done', () => {
    it('requires a callback', (done) => {
      fn = () => Instagit(modules, options)
      expect(fn).to.throw('must provide callback')

      done()
    })
  })
})

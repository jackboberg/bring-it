const Code = require('code')
const Lab = require('lab')
const Proxyquire = require('proxyquire')
const Sinon = require('sinon')

var spawn = Sinon.stub()
const Install = Proxyquire('../lib/install', {
  './spawn': spawn
})

var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var beforeEach = lab.beforeEach
var afterEach = lab.afterEach
var expect = Code.expect

beforeEach(function (done) {
  spawn.yields()
  done()
})

afterEach(function (done) {
  spawn.reset()
  done()
})

describe('install', () => {
  var module, options

  beforeEach((done) => {
    module = 'test'
    options = '-D'

    done()
  })

  it('exports a function', (done) => {
    expect(Install).to.be.a.function()
    done()
  })

  it('uses npm to install the module', function (done) {
    Install(module, options, function () {
      expect(spawn.calledWith('npm', ['install', 'test', '-D'])).to.be.true()
      done()
    })
  })

  describe('when process yields an error', function () {
    var error

    beforeEach(function (done) {
      error = new Error('spawn err')
      spawn.yields(error)
      done()
    })

    it('yields the error', function (done) {
      Install(module, options, function (err) {
        expect(err).to.equal(error)
        done()
      })
    })
  })
})

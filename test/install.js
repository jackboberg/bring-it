const CP = require('child_process')

const Code = require('code')
const Lab = require('lab')
const Sinon = require('sinon')

const Install = require('../lib/install')

var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var beforeEach = lab.beforeEach
var afterEach = lab.afterEach
var expect = Code.expect

beforeEach(function (done) {
  var cp = {
    on: Sinon.stub().withArgs('exit').yields()
  }
  Sinon.stub(CP, 'spawn').returns(cp)
  done()
})

afterEach(function (done) {
  CP.spawn.restore()
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
      expect(CP.spawn.calledWith('npm', ['install', 'test', '-D'])).to.be.true()
      done()
    })
  })
})

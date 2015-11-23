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
  var cp = CP.spawn('sleep', ['0.001'])
  Sinon.stub(CP, 'spawn').returns(cp)
  done()
})

afterEach(function (done) {
  CP.spawn.restore()
  done()
})

describe('install', () => {
  var module, options, proc

  beforeEach((done) => {
    module = 'test'
    options = '-D'
    proc = CP.spawn('echo Test')

    done()
  })

  it('exports a function', (done) => {
    expect(Install).to.be.a.function()
    done()
  })

  it('returns a child process', function (done) {
    proc = Install(module, options)
    expect(proc.constructor.name).to.equal('ChildProcess')
    proc.on('exit', done)
  })

  it('uses npm to install the module', function (done) {
    proc = Install(module, options)
    expect(CP.spawn.calledWith('npm', ['install', 'test', '-D'])).to.be.true()
    proc.on('exit', done)
  })
})

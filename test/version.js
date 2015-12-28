const Events = require('events')
const Stream = require('stream')

const Code = require('code')
const Lab = require('lab')
const Proxyquire = require('proxyquire')
const Sinon = require('sinon')

const cp = new Events.EventEmitter()
const winSpawn = Sinon.stub().returns(cp)

const Version = Proxyquire('../lib/version', {
  'win-spawn': winSpawn
})

const lab = exports.lab = Lab.script()

const describe = lab.describe
const it = lab.it
const beforeEach = lab.beforeEach
const afterEach = lab.afterEach
const expect = Code.expect

beforeEach(function (done) {
  cp.stdout = new Stream.PassThrough()
  done()
})

afterEach(function (done) {
  winSpawn.reset()
  cp.removeAllListeners()
  cp.stdout.unpipe()
  done()
})

describe('version', () => {
  var module, stdout

  beforeEach((done) => {
    module = 'test'
    stdout = [
      'instagit@0.0.0 /path/to/instagit',
      '└── test@1.2.3 ',
      ''
    ].join('\n')
    done()
  })

  it('exports a function', (done) => {
    expect(Version).to.be.a.function()
    done()
  })

  it('yields the installed version', function (done) {
    Version(module, function (err, version) {
      expect(err).to.not.exist()
      expect(version).to.equal('1.2.3')
      done()
    })
    cp.stdout.end(stdout)
  })

  describe('when no version can be found', function () {
    it('yields unknown', function (done) {
      Version(module, function (err, version) {
        expect(err).to.not.exist()
        expect(version).to.equal('unknown')
        done()
      })
      cp.stdout.end('invalid output')
    })
  })

  describe('when npm errors', function () {
    it('yields the error', function (done) {
      var error = new Error('npm error')
      Version(module, function (err) {
        expect(err).to.be.instanceOf(Error)
        expect(err).to.equal(error)
        done()
      })
      cp.emit('error', error)
    })
  })
})

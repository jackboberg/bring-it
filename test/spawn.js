const Events = require('events')

const Code = require('code')
const Lab = require('lab')
const Proxyquire = require('proxyquire')
const Sinon = require('sinon')

const cp = new Events.EventEmitter()
const winSpawn = Sinon.stub().returns(cp)

const Spawn = Proxyquire('../lib/spawn', {
  'win-spawn': winSpawn
})

const lab = exports.lab = Lab.script()

const describe = lab.describe
const it = lab.it
const beforeEach = lab.beforeEach
const afterEach = lab.afterEach
const expect = Code.expect

afterEach(function (done) {
  winSpawn.reset()
  cp.removeAllListeners()
  done()
})

describe('spawn', () => {
  var cmd, args, options

  beforeEach((done) => {
    cmd = 'test'
    args = ['arg1', 'arg2']
    options = { cwd: '/tmp', stdio: 'ignore' }
    done()
  })

  it('exports a function', (done) => {
    expect(Spawn).to.be.a.function()
    done()
  })

  it('spawns a child with passed params', function (done) {
    Spawn(cmd, args, options, function () {
      expect(winSpawn.calledWith(cmd, args, options)).to.be.true()
      done()
    })
    cp.emit('close', 0)
  })

  it('sets stdio to inherit if not present', function (done) {
    delete options.stdio
    Spawn(cmd, args, options, function () {
      expect(winSpawn.lastCall.args[2].cwd).to.equal('/tmp')
      expect(winSpawn.lastCall.args[2].stdio).to.equal('inherit')
      done()
    })
    cp.emit('close', 0)
  })

  describe('when the child process errors', function () {
    it('yields the error', function (done) {
      var error = new Error('cp err')
      Spawn(cmd, args, options, function (err) {
        expect(err).to.equal(error)
        done()
      })
      cp.emit('error', error)
    })
  })

  describe('when the child exits non-zero', function () {
    it('yields an error', function (done) {
      Spawn(cmd, args, options, function (err) {
        expect(err).to.be.instanceOf(Error)
        expect(err.message).to.equal('non-zero exit code: 1')
        done()
      })
      cp.emit('close', 1)
    })
  })
})

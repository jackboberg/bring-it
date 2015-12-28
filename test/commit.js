const Code = require('code')
const Lab = require('lab')
const Proxyquire = require('proxyquire')
const Sinon = require('sinon')

const spawn = Sinon.stub()
const version = Sinon.stub()
const Commit = Proxyquire('../lib/commit', {
  './version': version,
  './spawn': spawn
})

const lab = exports.lab = Lab.script()

const describe = lab.describe
const it = lab.it
const beforeEach = lab.beforeEach
const afterEach = lab.afterEach
const expect = Code.expect

beforeEach(function (done) {
  version.yields(null, '1.2.3')
  spawn.yields()
  done()
})

afterEach(function (done) {
  version.reset()
  spawn.reset()
  done()
})

describe('commit', () => {
  var module

  beforeEach(function (done) {
    module = 'test'
    done()
  })

  it('exports a function', (done) => {
    expect(Commit).to.be.a.function()
    done()
  })

  it('gets the currently installed version', function (done) {
    Commit(module, function () {
      expect(version.calledWith('test')).to.be.true()
      done()
    })
  })

  describe('if version yields an error', function () {
    var error

    beforeEach(function (done) {
      error = new Error('version error')
      version.yields(error)
      done()
    })

    it('yields the error', function (done) {
      Commit(module, function (err) {
        expect(err).to.be.instanceOf(Error)
        expect(err).to.equal(error)
        done()
      })
    })
  })

  it('commit staged changes', function (done) {
    Commit(module, function () {
      var args = ['commit', '-m', 'Add test@1.2.3 to dependencies']
      expect(spawn.calledWith('git', args)).to.be.true()
      done()
    })
  })

  describe('if git yields an error', function () {
    var error

    beforeEach(function (done) {
      error = new Error('git error')
      spawn.yields(error)
      done()
    })

    it('yields the error', function (done) {
      Commit(module, function (err) {
        expect(err).to.be.instanceOf(Error)
        expect(err).to.equal(error)
        done()
      })
    })
  })
})

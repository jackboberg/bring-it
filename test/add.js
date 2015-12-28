const Code = require('code')
const Lab = require('lab')
const Proxyquire = require('proxyquire')
const Sinon = require('sinon')

const spawn = Sinon.stub()
const Add = Proxyquire('../lib/add', {
  './spawn': spawn
})

const lab = exports.lab = Lab.script()

const describe = lab.describe
const it = lab.it
const beforeEach = lab.beforeEach
const afterEach = lab.afterEach
const expect = Code.expect

beforeEach(function (done) {
  spawn.yields()
  done()
})

afterEach(function (done) {
  spawn.reset()
  done()
})

describe('add', () => {
  it('exports a function', (done) => {
    expect(Add).to.be.a.function()
    done()
  })

  it('adds the package to the git index', function (done) {
    Add(function () {
      expect(spawn.calledWith('git', ['add', 'package.json'])).to.be.true()
      done()
    })
  })

  describe('when spawn yields an error', function () {
    var error

    beforeEach(function (done) {
      error = new Error('spawn err')
      spawn.yields(error)
      done()
    })

    it('yields the error', function (done) {
      Add(function (err) {
        expect(err).to.equal(error)
        done()
      })
    })
  })
})

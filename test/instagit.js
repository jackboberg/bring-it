const Code = require('code')
const Lab = require('lab')
const Proxyquire = require('proxyquire')
const Sinon = require('sinon')

const add = Sinon.stub().yields()
const commit = Sinon.stub().yields()
const install = Sinon.stub().yields()

const Instagit = Proxyquire('../lib/instagit', {
  './add': add,
  './commit': commit,
  './install': install
})

const lab = exports.lab = Lab.script()

const describe = lab.describe
const it = lab.it
const beforeEach = lab.beforeEach
const afterEach = lab.beforeEach
const expect = Code.expect

afterEach(function (done) {
  add.reset()
  install.reset()
  done()
})

describe('instagit', () => {
  var modules, options

  beforeEach((done) => {
    modules = 'test'
    options = '-D'

    done()
  })

  it('exports a function', (done) => {
    expect(Instagit).to.be.a.function()
    done()
  })

  it('installs the module', function (done) {
    Instagit(modules, options, function () {
      expect(install.calledWith('test', ['-D'])).to.be.true()
      done()
    })
  })

  it('adds the updated package to the git index', function (done) {
    Instagit(modules, options, function () {
      expect(add.called).to.be.true()
      done()
    })
  })

  it('commits the git addition', function (done) {
    expect(commit.calledWith('test')).to.be.true()
    done()
  })
})

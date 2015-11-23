const Code = require('code')
const Lab = require('lab')
const Proxyquire = require('proxyquire')
const Sinon = require('sinon')

var install = Sinon.stub().yields()
var add = Sinon.stub().yields()

const Instagit = Proxyquire('../lib/instagit', {
  './add': add,
  './install': install
})

var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var beforeEach = lab.beforeEach
var afterEach = lab.beforeEach
var expect = Code.expect

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

  it('commits the git addition', { skip: true }, function (done) {
    done()
  })
})

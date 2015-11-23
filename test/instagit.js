const Code = require('code')
const Lab = require('lab')
const Proxyquire = require('proxyquire')
const Sinon = require('sinon')

var install = Sinon.stub().yields(new Error('install error'))

const Instagit = Proxyquire('../lib/instagit', {
  './install': install
})

var lab = exports.lab = Lab.script()

var describe = lab.describe
var it = lab.it
var beforeEach = lab.beforeEach
var expect = Code.expect

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

  it('adds the updated package to the git index', { skip: true }, function (done) {
    done()
  })

  it('commits the git addition', { skip: true }, function (done) {
    done()
  })
})

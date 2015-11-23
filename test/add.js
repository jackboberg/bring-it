const CP = require('child_process')

const Code = require('code')
const Lab = require('lab')
const Sinon = require('sinon')

const Add = require('../lib/add')

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

describe('add', () => {
  var options

  beforeEach((done) => {
    options = {}

    done()
  })

  it('exports a function', (done) => {
    expect(Add).to.be.a.function()
    done()
  })

  it('adds the pacakge to the git index', function (done) {
    Add(options, function () {
      expect(CP.spawn.calledWith('git', ['add', 'package.json'])).to.be.true()
      done()
    })
  })
})

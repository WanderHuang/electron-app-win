let assert = require('assert')
describe('Array', function () { // title of this unit test
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () { // finish when
      assert.equal([1, 2, 3].indexOf(4), -1)
    })
  })
  it('array is ok', function (done) {
    setImmediate(done)
  })
  // hooks
  before(function () {
    // runs before all tests in this block
    console.log('---- before ----')
  })

  after(function () {
    // runs after all tests in this block
    console.log('---- after ----')
  })

  beforeEach(function () {
    // runs before each test in this block
    console.log('---- beforeEach ----')
  })

  afterEach(function () {
    // runs after each test in this block
    console.log('---- afterEach ----')
  })
})

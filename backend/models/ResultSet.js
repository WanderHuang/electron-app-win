/**
 * 统一返回结果封装
 */
class ResultSet {
  constructor(data, code) {
    this.data = data
    this.code = code
    this.msg = this.code === 0 ? 'success' : 'something is wrong'
  }

  getResult () {
    return {
      data: this.data,
      code: this.code,
      msg:  this.msg
    }
  }
}

module.exports = ResultSet
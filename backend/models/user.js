/**
 * 用户对象
 */
class User {
  constructor(user) {
    this.username = user.username
    this.password = user.password
    this.avatar = user.avatar
    this.address = user.address
  }
}
module.exports = User
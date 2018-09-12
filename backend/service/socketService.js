
const chalk = require('chalk')
class SocketWorker {
  constructor(io) {
    this.io = io
    this.sockets = []
  }

  run() {
    let sockets = this.sockets
    this.io.on('connection', function(socket) {
      sockets.push(socket)
      console.log(chalk.greenBright(`socket ${socket.id} is connected`))
      socket.on('msg', (id, msg) => {
        // 拿到消息广播出去
        sockets.map(sock => {
          sock.emit('msg', {
            id: id,
            name: msg.name,
            content: msg.content
          })
        })
      })
      socket.on('destroy', (id, data) => {
        let sockIndex = sockets.findIndex(item => {
          return item.id === id
        })
        sockets.splice(sockIndex, 1)
        console.log(chalk.redBright(`splite ${sockIndex}  id= ${id}  remained ${sockets.length}`))
      })
    })
  }
}
module.exports = SocketWorker
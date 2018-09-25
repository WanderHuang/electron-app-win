
const logger = require('../config/logger.js')
class SocketWorker {
  constructor(io) {
    this.io = io
    this.sockets = []
  }

  run() {
    let sockets = this.sockets
    this.io.on('connection', function(socket) {
      logger.info('[socketService] [connection]', `socket ${socket.id} is connected`)
      sockets.push(socket)

      // receive message
      socket.on('msg', (id, msg) => {
        logger.info('[socketService] [msg]', `${JSON.stringify(msg)}`)
        // 拿到消息广播出去
        sockets.map(sock => {
          sock.emit('msg', {
            id: id,
            name: msg.name,
            content: msg.content
          })
        })
      })

      // log out
      socket.on('destroy', (id, data) => {
        let sockIndex = sockets.findIndex(item => {
          return item.id === id
        })
        sockets.splice(sockIndex, 1)
        logger.info('[socketService] [destroy]', `splite ${sockIndex}  id= ${id}  remained ${sockets.length}`)
      })
    })
  }
}

module.exports = SocketWorker
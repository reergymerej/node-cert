console.log('server')

const net = require('net')

const server = net.createServer()
server.listen(3333)
server.on('connection', (socket) => {
  console.log(socket)
})

module.exports = function(io, socket, user) {
  socket.on('chat message', (msg) => {
    io.emit('chat message', user.userID + ': ' + msg)
  })
}

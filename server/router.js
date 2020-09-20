const Game = require('./game/index.js')
let users = {}
let games = {}

module.exports = function(io, deck) {
  io.on('connection', (socket) => {
    let user = {
      userID: Math.floor(Math.random()*1000),
      createdAt: Date.now()
    }

    users[user.userID] = user

    console.log('A user connected with random user ID ' + user.userID)

    // Instantiate user-specific modules
    let chat = require('./chat.js')(io, socket, user)


    io.emit('chat message', 'User ' + user.userID + ' connected')

    socket.on('createGame', (e) => {
      console.log('creating new game')
      let gameID = Math.floor(Math.random() * 10000000)
      const gameSpace = io.of('/' + gameID)

      let GameInstance = new Game(gameSpace)

      gameSpace.on('connection', (ev) => {
        console.log('User connected to game ' + gameID)
      })

      gameSpace.on('deal', (ev) => {
        console.log('dealing to gameSpace ' + gameID)
        GameInstance.deal();
      })
    })

    socket.on('joinGame', (e) => {
      console.log('joining game')
    })

    socket.on('startGame', (e) => {
      console.log('starting game')
    })


    // On disconnect, clean up
    socket.on('disconnect', () => {
      io.emit('chat message', 'User ' + user.userID + ' disconnected')

      console.log('User ' + user.userID + ' disconnected - lived for ' + (Date.now() - user.createdAt) + 'ms')

      delete users[user.userID]
    })
  })


}

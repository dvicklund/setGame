const Game = require('./game/index.js')
let users = {}

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
    let GameInstance = new Game(io)

    io.emit('chat message', 'User ' + user.userID + ' connected')

    // socket.on('deal', (e) => {
    //   deck = new Deck()
    //   let newCards = []
    //
    //   for (var i = 0; i < 12; i++) {
    //     newCards.push(deck.draw())
    //     if(i == 11) io.emit('newCards', newCards);
    //   }
    // })

    socket.on('deal', (e) => {
      GameInstance.deal();
    })

    // On disconnect, clean up
    socket.on('disconnect', () => {
      io.emit('chat message', 'User ' + user.userID + ' disconnected')

      console.log('User ' + user.userID + ' disconnected - lived for ' + (Date.now() - user.createdAt) + 'ms')

      delete users[user.userID]
    })
  })

  // io.on('gameStart', (socket) => {
  //
  // })
}

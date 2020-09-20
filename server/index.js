let express = require('express')
let app = express()
let http = require('http').createServer(app)
let io = require('socket.io')(http)
let path = require('path')
let port = 3010

let Deck = require('./game/Deck.js')

let deck;

app.use(express.static(path.resolve(__dirname + '/../client/')))

let router = require('./router.js')(io, deck)

// io.on('connection', (socket) => {
//   let user = {
//     userID: Math.floor(Math.random()*1000),
//     createdAt: Date.now()
//   }
//
//   users[user.userID] = user
//
//   console.log('A user connected with random user ID ' + user.userID)
//
//   // Instantiate user-specific modules
//   let chat = require('./chat.js')(io, socket, deck, user)
//
//   io.emit('chat message', 'User ' + user.userID + ' connected')
//
//   socket.on('deal', (e) => {
//     deck = new Deck()
//     let newCards = []
//
//     for (var i = 0; i < 12; i++) {
//       newCards.push(deck.draw())
//       if(i == 11) io.emit('newCards', newCards);
//     }
//   })
//
//   // On disconnect, clean up
//   socket.on('disconnect', () => {
//     io.emit('chat message', 'User ' + user.userID + ' disconnected')
//
//     console.log('User ' + user.userID + ' disconnected and was connected for ' + (Date.now() - user.createdAt) + 'ms')
//
//     delete users[user.userID]
//   })
// })

http.listen(port, () => {
  console.log('Server listening on port ' + port)
})

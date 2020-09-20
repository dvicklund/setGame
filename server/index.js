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

http.listen(port, () => {
  console.log('Server listening on port ' + port)
})

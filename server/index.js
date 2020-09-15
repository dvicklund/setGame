let express = require('express')
let app = express()
let http = require('http').createServer(app)
let io = require('socket.io')(http)
let path = require('path')
let port = 3010
let users = {}

class Card {
  constructor(id, color, number, shape, shade) {
    this.id = id
    this.color = color
    this.number = number
    this.shape = shape
    this.shade = shade
  }
}

class Deck {
  constructor() {
    this.cards = []

    const colors = ['red', 'purple', 'green']
    const shapes = ['diamond', 'tilde', 'oval']
    const shades = ['solid', 'shaded', 'clear']

    let index = 0

    for (let a = 0; a < 3; a++) {
      for (let b = 0; b < 3; b++) {
        for (let c = 0; c < 3; c++) {
          for (let d = 0; d < 3; d++) {
            this.cards.push(new Card(index++, colors[a], b+1, shapes[c], shades[d]))
          }
        }
      }
    }

    this.cards = this.shuffle()
  }

  shuffle() {
    var currentIndex = this.cards.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }

    console.log(this.cards.map(({ id }) => id))

    return this.cards;
  }

  draw() {
    return this.cards.pop()
  }

  get cardsRemaining() {
    return this.cards.length
  }
}

let deck;

app.use(express.static(path.resolve(__dirname + '/../client/')))

io.on('connection', (socket) => {
  let newUser = {userID: Math.floor(Math.random()*100)}

  users[newUser.userID] = newUser

  console.log('A user connected with random user ID ' + newUser.userID)
  io.emit('chat message', 'User ' + newUser.userID + ' connected')

  socket.on('disconnect', () => {
    io.emit('chat message', 'User ' + newUser.userID + ' disconnected')

    console.log('User ' + newUser.userID + ' disconnected')
    delete users[newUser.userID]
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', newUser.userID + ': ' + msg)

    if(msg == 'create') {
      deck = new Deck()
    }

    if(msg == 'draw') {
      console.log(deck.draw())
      console.log(deck.cardsRemaining + ' cards remain')
    }
  })

  socket.on('deal', (e) => {
    deck = new Deck()
    let newCards = []

    for (var i = 0; i < 12; i++) {
      newCards.push(deck.draw())
      if(i == 11) io.emit('newCards', newCards);
    }
  })
})

http.listen(port, () => {
  console.log('Server listening on port ' + port)
})

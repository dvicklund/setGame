const Deck = require('./Deck.js')

module.exports = class Dealer {
  constructor() {
    this.deck = new Deck()
  }

  deal(io) {
    let newCards = []

    for (var i = 0; i < 12; i++) {
      newCards.push(this.deck.draw())
      if(i == 11) {
        io.emit('newCards', newCards)
        return
      }
    }
  }
}

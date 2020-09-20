const Card = require('./Card.js')

module.exports = class Deck {
  constructor() {
    this.cards = []

    // Choose properties of cards
    const colors = ['red', 'purple', 'green']
    const shapes = ['diamond', 'tilde', 'oval']
    const shades = ['solid', 'shaded', 'clear']

    let index = 0

    // Create the deck
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

    // Log Card IDs for debugging
    // console.log(this.cards.map(({ id }) => id))

    return this.cards;
  }

  draw() {
    return this.cards.pop()
  }

  get cardsRemaining() {
    return this.cards.length
  }
}

const Dealer = require('./Dealer.js')

module.exports = class Game {
  constructor(io) {
    this.dealer = new Dealer()
    this.io = io
  }

  deal() {
    return this.dealer.deal(this.io)
  }
}

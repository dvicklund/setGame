const Dealer = require('./Dealer.js')

module.exports = class Game {
  constructor(gameSpace) {
    this.dealer = new Dealer()
    this.gameSpace = gameSpace
  }

  deal() {
    return this.dealer.deal(this.gameSpace)
  }
}

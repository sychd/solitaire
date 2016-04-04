/**
 * Created by Sych on 04.04.2016.
 */

  "use strict";
class DeckHolderComponent extends GameComponent{
  constructor(options) {
    super(options);
    this._deck = options.deck;
    this._number = options.number;//gameRow
  }

  getNumber() {
    return this._number;
  }

  getDeck () {
    return this._deck;
  }

  setDeck(d) {
    this._deck = d;
  }

}
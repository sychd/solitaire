/**
 * Created by Sych on 04.04.2016.
 */
"use strict";
class Base extends DeckHolderComponent {
  constructor(options) {
    super(options);
    this._full = false;
    //this._DOM = RenderHandler.renderBase(this);
  }

  isFull() {
    return this._full;
  }
  setDeck(d) {
    this._deck = d;
    if (this._deck.length === 14) {
      this._full = true;
    }
  }

}
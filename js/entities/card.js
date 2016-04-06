/**
 * Created by Sych on 04.04.2016.
 */

"use strict";

class Card extends GameComponent {
  constructor(options) {
    super(options);

    this._suit = options.suit;
    this._color = options.color;
    this._value = options.value;
    this._imgName = options.imgName;
    this._flipped = false;
  }
  isFlipped() {
    return this._flipped;
  }
  getColor() {
    return this._color;
  }
  getValue() {
    return this._value;
  }
  getSuit() {
    return this._suit;
  }
  flipCard() {
    this._DOM.style.backgroundImage = "url('" + IMG_CARD_PATH + this._imgName + ".png')";
    this._flipped = true;
  }

  getCardHolderByDOM(DOM) {
    return
  }

}
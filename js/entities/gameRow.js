/**
 * Created by Sych on 29.03.2016.
 */
"use strict";
class GameRow extends DeckHolderComponent {
  constructor(options) {
    super(options);
    this._DOM = RenderHandler.renderGameRow(this);
    RenderHandler.renderCards(this);
    this._deck[this._deck.length - 1].flipCard();
  }

}
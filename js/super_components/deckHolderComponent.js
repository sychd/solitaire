/**
 * Created by Sych on 04.04.2016.
 */

  "use strict";
class DeckHolderComponent extends GameComponent{
  constructor(options) {
    super(options);
    this._deck = options.deck;
    this._number = options.number;//gameRow
    this._DOM = RenderHandler.renderCardHolder(this);

    this._DOM.addEventListener('mousedown',this._onGameHolderMousedown.bind(this));
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

  getDeckCardByDOM(DOM) {
    for(let i = 0; i < this._deck.length; i++) {
      if(DOM === this._deck[i].getDOM()) {
        return this._deck[i];
      }
    }
  }
  getDeckCardPos(card) {
    for(let i = 0; i < this._deck.length; i++) {
      if(card === this._deck[i]) {
        return i;
      }
    }
  }

  _onGameHolderMousedown(event) {

    if (event.target.closest('[data-selector="deck"]') ||
        event.target.closest('[data-selector="base"]')) {//no drag for deck and bases
      return;
    }

    let options = {
      selectedCard: this.getDeckCardByDOM(event.target.closest('[data-selector="card"]')),
      cardHolder: this,
      pageX: event.pageX,
      pageY: event.pageY
    }

    if(!options.selectedCard) {//no drag for empty cardHolders
      return;
    }

    this._triggerGameHolderMousedown(options);
  }

  _triggerGameHolderMousedown(options) {
    let event  = new CustomEvent('cardDnD', {
      detail:options,
      bubbles:true
    });
    this._DOM.dispatchEvent(event);
  }

}
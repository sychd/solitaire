/**
 * Created by Sych on 04.04.2016.
 */
"use strict";
class Deck extends DeckHolderComponent {
  constructor(options) {
    super(options);
    this._DOM = RenderHandler.renderDeck(this);
    RenderHandler.renderCards(this);

    this._DOM.addEventListener('click',this._onDeckClick.bind(this));
    this._DOM.addEventListener('mousedown', this._onDeckMousedown.bind(this));
  }

  _onDeckClick(event) {
    let deck = event.target.closest('[data-selector="deck"]');

    if(!deck) {
      return;
    }

    let card = this._deck.pop();
    this._triggerDeckClicked(card);
  }

  _triggerDeckClicked(card) {
    let event  = new CustomEvent('deckClicked', {
      detail:card
    });

    this._DOM.dispatchEvent(event);
  }

  _onDeckMousedown() {
    let openedDeck = event.target.closest('[data-selector="opened-deck"]');

    if(!openedDeck) {
      return;
    }
  }
}


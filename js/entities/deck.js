/**
 * Created by Sych on 04.04.2016.
 */
"use strict";
class Deck extends DeckHolderComponent {
  constructor(options) {
    super(options);
    RenderHandler.renderCards(this);

    this._DOM.addEventListener('click',this.onDeckClick.bind(this));
  }

  onDeckClick(event) {
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

}


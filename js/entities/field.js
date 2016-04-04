/**
 * Created by Sych on 04.04.2016.
 */
"use strict";

class Field extends GameComponent {
  constructor(options) {
    super(options);
    this._DOM = RenderHandler.renderField(this);

    this._globalDeck = DeckHandler.initGlobalDeck();

    this._gameRows = this._initGameRows();
    this._bases = this._initBases();

    this._deck = new Deck({
      id: 'deck',
      selector: 'deck',
      parentDOM: this._DOM,
      deck: DeckHandler.getCardsForDeck(24,this._globalDeck)
    });

    this._openedDeck = new Deck({
      id: 'opened-deck',
      selector: 'opened-deck',
      parentDOM: this._DOM,
      deck: DeckHandler.getCardsForDeck(0,this._globalDeck)
    });

    //listeners
    this._deck.getDOM().addEventListener('deckClicked', this._onDeckClicked.bind(this));
    this._deck.getDOM().addEventListener('deckMousedown', this._onDeckMousedown.bind(this));

  }


  _onDeckClicked(event) {
    let card = event.detail;

    if(card === null || card === undefined) {
      this._deck.setDeck(this._openedDeck.getDeck());
      this._openedDeck.setDeck([]);

      RenderHandler.removeDOM(this._openedDeck);
      this._openedDeck.setDOM(RenderHandler.renderDeck(this._openedDeck));
      RenderHandler.renderCards(this._deck);
    } else {

      this._openedDeck.getDeck().push(card);
      card.setParentDOM(this._openedDeck.getDOM());

      RenderHandler.removeDOM(card);
      card.setDOM(RenderHandler.renderCard(card));
      card.flipCard();
    }
  }

  _onDeckMousedown(event) {
    let options = event.detail;

  }

  _initBases() {
    let bases = [];

    for (let i = 0; i < 4; i++) {//4 - bases quantity
      bases[i] = new Base({
        number: i,
        id: i + 'base',
        selector: 'base',
        parentDOM: this._DOM,
        deck: []
      });
    }

    return bases;
  }
  _initGameRows() {
    let gameRows = [];

    for (let i = 0; i < 7; i++) {//7 - rows quantity
      gameRows[i] = new GameRow({
        number: i,
        id: i + 'game-row',
        selector: 'game-row',
        parentDOM: this._DOM,
        deck: DeckHandler.getCardsForDeck(i + 1, this._globalDeck)
      });
    }

    return gameRows;
  }



}
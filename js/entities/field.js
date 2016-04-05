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

    this._deckHolder = new Deck({
      id: 'deck',
      selector: 'deck',
      parentDOM: this._DOM,
      deck: DeckHandler.getCardsForDeck(24, this._globalDeck)
    });

    this._openedDeckHolder = new Deck({
      id: 'opened-deck',
      selector: 'opened-deck',
      parentDOM: this._DOM,
      deck: DeckHandler.getCardsForDeck(0, this._globalDeck)
    });

    this._deckHolder.getDOM().addEventListener('deckClicked', this.onDeckClicked.bind(this));
    this._addEventListenersForCardHolders('cardDnD', this.onCardDnD);

  }

  getDeckHolder() {
    return this._deckHolder;
  }

  getOpenedDeckHolder() {
    return this._openedDeckHolder;
  }

  addEventListenerForCardHolder(eventName, eventHandlerFun,cardHolder) {
    cardHolder.getDOM().addEventListener(eventName, eventHandlerFun.bind(this));
  }

  _addEventListenersForCardHolders(eventName, eventHandlerFun) {
    for (let i = 0; i < 7; i++) {
      this.addEventListenerForCardHolder(eventName, eventHandlerFun,this._gameRows[i]);
    }
    for (let i = 0; i < 4; i++) {
      this.addEventListenerForCardHolder(eventName, eventHandlerFun,this._bases[i]);
    }
    this.addEventListenerForCardHolder(eventName, eventHandlerFun,this._openedDeckHolder);
  }

  onDeckClicked(event) {
    let options = {};
    options.card = event.detail;
    options.parentObj = this;

    DeckClickHandler.deckClick(options);
  }

  onCardDnD(event) {
    let options = event.detail;
    options.parentObj = this;
    options.event = event;
    DragHandler.drangAndDrop(options);
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
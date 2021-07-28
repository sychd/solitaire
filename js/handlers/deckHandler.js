class DeckHandler {

  static initGlobalDeck() {
    let globalDeck = DeckHandler.createGlobalDeck();
    DeckHandler.shuffleDeck(globalDeck);

    return globalDeck;
  }

  static getCardsForDeck(quantity, globalDeck) {
    let array = [];
    for (let i = 0; i < quantity; i++) {
      array[i] = globalDeck.pop();
    }

    return array;
  }

  static createGlobalDeck() {
    let deckArr = [];
    for (let i = 0; i < 13; i++) {
      deckArr[i] = new Card({
        selector: 'card',
        suit: 'hearts',
        color: 'red',
        value: i + 2,
        imgName: (i + 2) + '_of_hearts',
        id: i + 'card'
      });
      deckArr[i + 13] = new Card({
        selector: 'card',
        suit: 'diamonds',
        color: 'red',
        value: i + 2,
        imgName: (i + 2) + '_of_diamonds',
        id: i + 13 + 'card'
      });
      deckArr[i + 26] = new Card({
        selector: 'card',
        suit: 'spades',
        color: 'black',
        value: i + 2,
        imgName: (i + 2) + '_of_spades',
        id: i + 26 + 'card'
      });
      deckArr[i + 39] = new Card({
        selector: 'card',
        suit: 'clubs',
        color: 'black',
        value: i + 2,
        imgName: (i + 2) + '_of_clubs',
        id: i + 49 + 'card'
      });
    }

    return deckArr;
  }

  static shuffleDeck(deckArr) {
    for (let i = 0; i < 200; i++) {
      let card1 = Math.ceil(Math.random() * DECK_SIZE - 1);
      let card2 = Math.ceil(Math.random() * DECK_SIZE - 1);

      let tmp = deckArr[card1];
      deckArr[card1] = deckArr[card2];
      deckArr[card2] = tmp;
    }

  }
}

"use strict";

class DragHandler {
  static drangAndDrop(options) {//options{selectedCard,cardHolder,parentObj(field),pageX,pageY}

    let cardHolder = options.cardHolder;
    let selectedCard = options.selectedCard;
    let coords = DragHandler.getCoords(selectedCard.getDOM());

    let field = options.parentObj;
    let e = options.event;

    if (!selectedCard.isFlipped()) {
      return false;
    }

    let wrapper = DragHandler.createWrapperGameRow(field, cardHolder, selectedCard);
    let wrapperDOM = wrapper.getDOM();

    wrapperDOM.ondragstart = function () {
      return false;
    };


    let shiftX = options.pageX - coords.left;
    let shiftY = options.pageY - coords.top;
    wrapperDOM.style.position = 'absolute';
    wrapperDOM.style.zIndex = "1000";
    moveAt(options.pageX, options.pageY);

    field.getDOM().onmousemove = function (event) {
      moveAt(event.pageX, event.pageY);
    };

    wrapperDOM.onmouseup = function (event) {
      let destinationCardHolder = DragHandler.getDestination(wrapperDOM, field);

      if (DragHandler.isAvailableDrop(destinationCardHolder, wrapper, field)) {
        DragHandler.dropWrapper(destinationCardHolder, wrapper, field);
        if (cardHolder.getDeck().length !== 0) {
          cardHolder.getDeck()[cardHolder.getDeck().length - 1].flipCard();
        }
      } else {
        DragHandler.dropWrapper(cardHolder, wrapper, field);
      }

      RenderHandler.removeDOM(wrapper);
      wrapper = null;

      field.getDOM().onmousemove = null;
      wrapperDOM.onmouseup = null;
    };

    function moveAt(pageX, pageY) {
      wrapperDOM.style.left = pageX - shiftX + 'px';
      wrapperDOM.style.top = pageY - shiftY + 'px';
    }
  }

  static isAvailableDrop(destinationCardHolder, wrapper) {
    let result = true;

    if (destinationCardHolder instanceof Field) {
      return false;
    }

    let destDeck = destinationCardHolder.getDeck();
    let wrapperDeck = wrapper.getDeck();

    if (!isLegalValue(destDeck, wrapperDeck)) {
      result = false;
    } else if (!isLegalColor(destDeck, wrapperDeck)) {
      result = false;
    }

    if (destinationCardHolder instanceof Base) {
      result = isLegalSuit(destDeck, wrapperDeck);
    }

    return result;

    function isLegalValue(destDeck, wrapperDeck) {
      let result = false;
      if (destDeck.length !== 0) {
        if (destDeck[destDeck.length - 1].getValue() === (wrapperDeck[0].getValue() + 1)) {
          result = true;
        } else if (destDeck[destDeck.length - 1].getValue() === 14 && wrapperDeck[0].getValue() === 2) {
          result = true;
        }
      }
      else {
        if (destinationCardHolder instanceof Base) {
          result = (wrapperDeck[0].getValue() === 2);
        }
        if (destinationCardHolder instanceof GameRow) {
          result = wrapperDeck[0].getValue() === 13;
        }
      }

      return result;
    }

    function isLegalColor(destDeck, wrapperDeck) {
      let result = true;
      if (destDeck.length !== 0) {
        result = destDeck[destDeck.length - 1].getColor() !== wrapperDeck[0].getColor();
      }

      return result;
    }

    function isLegalSuit(destDeck, wrapperDeck) {
      let result = true;
      if (destDeck.length !== 0) {
        for (let i = 0; i < wrapperDeck.length; i++) {
          if (wrapperDeck[0].getSuit() !== destDeck[i].getSuit()) {
            result = false;
          }
        }
        if (wrapperDeck[0].getSuit() !== destDeck[0].getSuit()) {
          result = false;
        }
      } else {
        result = (wrapperDeck[0].getValue() === 14);
      }
      return result;
    }
  }


  static dropWrapper(cardHolder, wrapper, field) {
    let wsize = wrapper.getDeck().length;
    let flipStartIndex = cardHolder.getDeck().length - wsize;
    wrapper.getDeck().reverse();
    for (let i = 0; i < wsize; i++) {
      cardHolder.getDeck().push(wrapper.getDeck().pop());
    }
    DragHandler.redrawCardHolder(cardHolder, field);
  }

  static getDestination(wrapperDOM, field) {
    wrapperDOM.style.zIndex = -1;
    let destionationDOM = document.elementFromPoint(event.pageX, event.pageY);
    wrapperDOM.style.zIndex = 1000;

    return DragHandler.getCardHolderByDestinationDOM(destionationDOM, field);
  }

  static getCardHolderByDestinationDOM(destDOM, field) {
    let parentSelector = destDOM.parentNode.dataset.selector;

    if (parentSelector === 'field') {
      for (let i = 0; i < 7; i++) {
        if (field.getGameRowByNumber(i).getDOM() === destDOM) {
          return field.getGameRowByNumber(i);
        }
      }
      for (let i = 0; i < 4; i++) {
        if (field.getBaseByNumber(i).getDOM() === destDOM) {
          return field.getBaseByNumber(i);
        }
      }
    }

    if (parentSelector === 'base') {
      for (let i = 0; i < 4; i++) {
        let deck = field.getBaseByNumber(i).getDeck();
        if (DragHandler.isCardInDeck(destDOM, deck)) {
          return field.getBaseByNumber(i);
        }
      }
    }

    if (parentSelector === 'game-row') {
      for (let i = 0; i < 7; i++) {
        let deck = field.getGameRowByNumber(i).getDeck();
        if (DragHandler.isCardInDeck(destDOM, deck)) {
          return field.getGameRowByNumber(i);
        }
      }
    }

    return field;
  }

  static isCardInDeck(cardDOM, deck) {
    for (let i = 0; i < deck.length; i++) {
      if (cardDOM === deck[i].getDOM()) {
        return true;
      }
    }

    return false;
  }

  static createWrapperGameRow(field, cardHolder, selectedCard) {
    let selCardPos = cardHolder.getDeckCardPos(selectedCard);
    let size = cardHolder.getDeck().length;
    let wrapperArray = DragHandler.moveCardsFromCardHolderToWrapperArray(size, selCardPos, cardHolder);

    let wrapper = new GameRow({
      i: 0,
      id: 'wrapper',
      selector: 'wrapper',
      parentDOM: field.getDOM(),
      deck: wrapperArray
    });
    RenderHandler.removeDOM(wrapper);// remove initial DOM

    DragHandler.drawWrapper(wrapper, wrapperArray, field);
    DragHandler.redrawCardHolder(cardHolder, field);

    return wrapper;
  }


  static getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset - 8,
      left: box.left + pageXOffset - 8
      //why 8? idk, but img doesen't "jump" when 8's here
    };

  }

  static moveCardsFromCardHolderToWrapperArray(size, selCardPos, cardHolder) {
    let wrapperArray = [];
    for (let i = selCardPos; i < size; i++) {
      wrapperArray.push(cardHolder.getDeck().pop());
    }
    wrapperArray = wrapperArray.reverse();

    return wrapperArray;
  }

  static drawWrapper(wrapper, wrapperArray, field) {
    wrapper.setDOM(RenderHandler.renderElement('', field.getDOM()));
    RenderHandler.renderCards(wrapper);
    for (let i = 0; i < wrapperArray.length; i++) {//flip rendered cards
      if (wrapperArray[i].isFlipped()) {
        wrapperArray[i].flipCard();
      }
    }
  }

  static redrawCardHolder(cardHolder, field) {
    RenderHandler.removeDOM(cardHolder);
    cardHolder.setDOM(RenderHandler.renderCardHolder(cardHolder));
    cardHolder.getDOM().addEventListener('mousedown', cardHolder.onGameHolderMousedown.bind(cardHolder)); //todo: another
    field.addEventListenerForCardHolder('cardDnD', field.onCardDnD, cardHolder);                           //todo: decision?
    RenderHandler.renderCards(cardHolder);

    for (let i = 0; i < cardHolder.getDeck().length; i++) {
      if (cardHolder.getDeck()[i].isFlipped()) {
        cardHolder.getDeck()[i].flipCard();
      }
    }
  }
}
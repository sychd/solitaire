"use strict";

class DragHandler {
  static drangAndDrop(options) {//options{selectedCard,cardHolder,parentObj(field),event,pageX,pageY}

    let cardHolder = options.cardHolder;
    let selectedCard = options.selectedCard;
    let coords = DragHandler.getCoords(selectedCard.getDOM());

    let field = options.parentObj;
    let e = options.event;

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

    wrapperDOM.onmouseup = function() {
      if(DragHandler.isAvailableDrag()) {

      }else {

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

  static createWrapperGameRow(field, cardHolder, selectedCard) {
    let selCardPos = cardHolder.getDeckCardPos(selectedCard);
    let size = cardHolder.getDeck().length;
    let wrapperArray = DragHandler.
                        moveCardsFromCardHolderToWrapperArray(size, selCardPos, cardHolder);

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
  static isAvailableDrag() {
    return true;
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
    wrapper.setDOM(RenderHandler.renderElement('',field.getDOM()));
    RenderHandler.renderCards(wrapper);
    for (let i = 0; i < wrapperArray.length; i++) {//flip rendered cards
      wrapperArray[i].flipCard();
    }
  }

  static redrawCardHolder(cardHolder, field) {
    RenderHandler.removeDOM(cardHolder);
    cardHolder.setDOM(RenderHandler.renderCardHolder(cardHolder));
    cardHolder.getDOM().addEventListener('mousedown', cardHolder._onGameHolderMousedown.bind(cardHolder)); //todo: another
    field.addEventListenerForCardHolder('cardDnD', field.onCardDnD, cardHolder);                           //todo: decision?
    RenderHandler.renderCards(cardHolder);

    if(cardHolder instanceof Deck) {//because of rendering with shirt
      for(let i = 0; i < cardHolder.getDeck().length; i++) {
        cardHolder.getDeck()[i].flipCard();
      }
    }

  }
}
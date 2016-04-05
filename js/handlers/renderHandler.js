/**
 * Created by Sych on 04.04.2016.
 */
"use strict";

class RenderHandler extends GameComponent {
  constructor(options) {
    super(options);
  }

  static renderCard(obj, marginTop) {
    let card = GameComponent.renderElement('card', obj.getParentDOM());
    let margin = marginTop || 0;
    card.style.top = margin + 'px';
    card.id = obj.getId();

    return card;
  }
  static renderDeck(obj) {
    if(obj.getId() === 'deck') {
      return GameComponent.renderElement("deck",obj.getParentDOM());
    } else {
      return GameComponent.renderElement("opened-deck",obj.getParentDOM());
    }
  }
  static renderField(obj){
    return GameComponent.renderElement("field",obj.getParentDOM());
  }

  static renderCardHolder(obj) {
    let result;
    if(obj instanceof Deck) {
      result =  RenderHandler.renderDeck(obj);
    } else if(obj instanceof  GameRow) {
      result = RenderHandler.renderGameRow(obj);
    } else if(obj instanceof  Base) {
      result = RenderHandler.renderBase(obj);
    }

    return result;
  }
  static renderBase(obj) {
    let base = GameComponent.renderElement('base', obj.getParentDOM());
    base.id = obj.getNumber() + 'base';
    let leftVal = 370;//first left padding in .css
    base.style.left = leftVal + (base.offsetWidth * obj.getNumber()) + 10 * (obj.getNumber()) + 'px';

    return base;
  }

  static renderGameRow(obj) {
    let gameRow = GameComponent.renderElement('game-row', obj.getParentDOM());
    gameRow.id = obj.getNumber() + 'gameRow';

    gameRow.style.left = (gameRow.offsetWidth * obj.getNumber()) + 10 * (obj.getNumber() + 1) + 'px';

    return gameRow;
  }

  static renderCards(obj) {
    let margin = 15;
    if(obj instanceof Deck){
      margin = 0;
    }
    for(let i = 0; i < obj.getDeck().length; i++) {
      obj.getDeck()[i].setParentDOM(obj.getDOM());
      obj.getDeck()[i].setDOM(RenderHandler.renderCard(obj.getDeck()[i],i * margin));
    }
  }

  static removeDOM(obj) {
    obj.getDOM().parentNode.removeChild(obj.getDOM());
  }

}
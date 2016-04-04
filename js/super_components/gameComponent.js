/**
 * Created by Sych on 04.04.2016.
 */
"use strict";

class GameComponent {
  constructor(options) {
    this._id = options.id;
    this._selector = options.selector;
    this._DOM = null;//inits in it's own constructor through RenderHandler
    this._parentDOM = options.parentDOM;
  }

  static renderElement(cssClass, parent) {
    let el = document.createElement('div');
    el.className = cssClass;
    el.dataset.selector = cssClass;
    parent.appendChild(el);

    return el;
  }

  getParentDOM() {
    return this._parentDOM;
  }
  setParentDOM(p) {
    this._parentDOM = p;
  }

  getId() {
    return this._id;
  }
  getDOM() {
    return this._DOM;
  }
  setDOM(p) {
    this._DOM = p;
  }
}

var DECK_SIZE = 52,
    IMG_CARD_PATH = 'img/cards/';
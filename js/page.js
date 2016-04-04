/**
 * Created by Sych on 29.03.2016.
 */
"use strict";

class Page {
  constructor(options) {
    this.DOM = options.DOM;

    this._field = new Field({
      id: 'field',
      selector: 'field',
      parentDOM: this.DOM
    });
  }
}






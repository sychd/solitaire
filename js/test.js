/**
 * Created by Sych on 06.04.2016.
 */

"use strict";
mocha.setup('bdd');
var assert = chai.assert;

let target = {
  deck: [],
  getDeck() {
    return this.deck;
  }
};
let wrapper ={
  deck: [],
  getDeck() {
    return this.deck;
  }
};
let card ={
  value: 0,
  getValue() {
    return this.value;
  }
};
let card2;

describe("isAvailableDrop", function () {
  before(function() {
    card.value = 13;
  });

  it("Только король на пустое место", function () {
    wrapper.getDeck().push(card);
    assert.equal(DragHandler.isAvailableDrop(target, wrapper), false);
  });
});

mocha.run();
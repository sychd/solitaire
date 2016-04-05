/**
 * Created by Sych on 05.04.2016.
 */
class DeckClickHandler {
  static deckClick(options) {
    let card = options.card;
    let field = options.parentObj;
    let openedDH = field.getOpenedDeckHolder();

    if(card === null || card === undefined) {
      field.getDeckHolder().setDeck(field.getOpenedDeckHolder().getDeck().reverse());
      openedDH.setDeck([]);

      RenderHandler.removeDOM(openedDH);
      openedDH.setDOM(RenderHandler.renderDeck(field.getOpenedDeckHolder()));
      openedDH.getDOM().addEventListener('mousedown', openedDH.onGameHolderMousedown.bind(openedDH));//
      field.addEventListenerForCardHolder('cardDnD', field.onCardDnD, openedDH);                     //
      RenderHandler.renderCards(field.getDeckHolder());
    } else {

      openedDH.getDeck().push(card);
      card.setParentDOM(openedDH.getDOM());

      RenderHandler.removeDOM(card);
      card.setDOM(RenderHandler.renderCard(card));
      card.flipCard();
    }
  }
}
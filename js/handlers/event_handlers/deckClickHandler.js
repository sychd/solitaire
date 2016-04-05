/**
 * Created by Sych on 05.04.2016.
 */
class DeckClickHandler {
  static deckClick(options) {
    let card = options.card;
    let field = options.parentObj;

    if(card === null || card === undefined) {
      field.getDeckHolder().setDeck(field.getOpenedDeckHolder().getDeck());
      field.getOpenedDeckHolder().setDeck([]);

      RenderHandler.removeDOM(field.getOpenedDeckHolder());
      field.getOpenedDeckHolder().setDOM(RenderHandler.renderDeck(field.getOpenedDeckHolder()));
      RenderHandler.renderCards(field.getDeckHolder());
    } else {

      field.getOpenedDeckHolder().getDeck().push(card);
      card.setParentDOM(field.getOpenedDeckHolder().getDOM());

      RenderHandler.removeDOM(card);
      card.setDOM(RenderHandler.renderCard(card));
      card.flipCard();
    }
  }
}
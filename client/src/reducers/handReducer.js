
const handReducer = (state = {}, action) => {

    const MAX_CARDS = 5;

    if (action.type === 'PLAY_CARD') {
      const index = action.payload.index;
      const length = state.cards.length;
      // console.log(action.payload.card);
      
      return {cards: [
        ...state.cards.slice(0, index),
        ...state.cards.slice(index + 1, length),
      ]};
    }
  
    if (action.type === 'DRAW_CARD') {
      if (state.cards.length + 1 > MAX_CARDS) {
        console.log("hand is full");
        return { cards: state.cards };
      }

      const card = { id: 5, name: 'Starlord', mana: 1, attack: 5, defense: 1 }
      return { cards: [...state.cards, card] };
    }
    return state;
};

export default handReducer;
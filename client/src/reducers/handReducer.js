import { newRandomCard } from "../utils/cards";

const handReducer = (state = {}, action) => {

    const MAX_CARDS = 5;

    if (action.type === 'PLAY_CARD') {
      const length = state.cards.length;
      // console.log(action.payload.card);
      
      const index = state.cards.findIndex(item => item === action.payload.card)
      
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

      const card = newRandomCard();
      return { cards: [...state.cards, card] };
    }
    return state;
};

export default handReducer;
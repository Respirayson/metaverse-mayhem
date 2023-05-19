import { configureStore } from '@reduxjs/toolkit'

const initialState = { cards: [
  { id: 1, name: 'Gabria Warden', mana: 1, attack: 5, defense: 1 },
  { id: 2, name: 'Abusive Sergeant', mana: 1, attack: 2, defense: 1 },
  { id: 3, name: 'Acolyte of Pain', mana: 3 },
  { id: 4, name: 'Azure Drake', mana: 5, attack: 4, defense: 4 },
]};

const deckReducer = (state = {}, action) => {
  if (action.type === 'PLACE_CARD') {
    const index = action.payload.index;
    const length = state.cards.length;
    console.log(action.payload.card);
    return {cards: [
      ...state.cards.slice(0, index),
      ...state.cards.slice(index + 1, length),
    ]};
  }

  if (action.type === 'LOG_CARD') {
    console.log(action.card);
    return state;
  }
  return state;
};

export default configureStore({
  reducer: deckReducer,
  preloadedState: initialState
})
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers';

const initialHand = { cards: [
  { id: 1, name: 'The Red Dragon', mana: 1, attack: 5, defense: 1 },
  { id: 2, name: 'The Onion', mana: 1, attack: 2, defense: 1 },
  { id: 3, name: 'Fire Phoenix', mana: 3 },
  { id: 4, name: 'Poison Flower', mana: 5, attack: 4, defense: 4 },
]};
 

export default configureStore({
  reducer: rootReducer,
  preloadedState: {
    hand: initialHand,
    user: "You",
    opponent: "Player 2",
  }
})
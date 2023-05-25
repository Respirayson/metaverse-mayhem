import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers';

const initialHand = { cards: [
  { id: 1, name: 'Jason Statham', mana: 1, attack: 5, defense: 1 },
  { id: 2, name: 'Dwayne Johnson', mana: 1, attack: 2, defense: 1 },
  { id: 3, name: 'Dominic Toretto', mana: 3 },
  { id: 4, name: 'Groot', mana: 5, attack: 4, defense: 4 },
]};
 

export default configureStore({
  reducer: rootReducer,
  preloadedState: {
    hand: initialHand,
    user: "You",
    opponent: "Player 2",
  }
})
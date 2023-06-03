import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers';
import { newRandomCard } from '../utils/cards';

const initialHand = { cards:
  Array(4).fill(0).map(() => newRandomCard())
}

export default configureStore({
  reducer: rootReducer,
  preloadedState: {
    hand: initialHand,
    user: "You",
    opponent: "Player 2",
  }
})
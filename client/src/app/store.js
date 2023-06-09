import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers';
import { newRandomCard } from '../utils/cards';
import { v4 as uuidv4 } from 'uuid';

const initialHand = { cards:
  Array(4).fill(0).map(() => Object.assign({}, newRandomCard(), { key: uuidv4() }))
}

export default configureStore({
  reducer: rootReducer,
  preloadedState: {
    hand: initialHand,
    user: "You",
    opponent: "Player 2",
  }
})
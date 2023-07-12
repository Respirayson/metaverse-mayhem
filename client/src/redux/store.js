import { configureStore } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import rootReducer from '../reducers';
import { newRandomCard } from '../utils/cards';
import { socketMiddleware } from '../utils/socketMiddleware';
import { socket } from '../utils/socket';

const initialHand = {
  cards: Array(4)
    .fill(0)
    .map(() => ({ ...newRandomCard(), key: uuidv4() })),
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(socket)),
  preloadedState: {
    hand: initialHand,
  },
});

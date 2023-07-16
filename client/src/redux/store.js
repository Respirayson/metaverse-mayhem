import { configureStore } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import rootReducer from '../reducers';
import { newRandomCard } from '../utils/cards';
import { socketMiddleware } from '../utils/socketMiddleware';
import { socket } from '../utils/socket';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialHand = {
  cards: Array(4)
    .fill(0)
    .map(() => ({ ...newRandomCard(), key: uuidv4() })),
};

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware(socket)),
  preloadedState: {
    hand: initialHand,
  },
});

export default store;

export const persistor = persistStore(store);

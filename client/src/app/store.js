import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import { newRandomCard } from "../utils/cards";
import { v4 as uuidv4 } from "uuid";
import { socketMiddleware } from "../utils/socketMiddleware";
import { socket } from "../utils/socket";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const initialHand = {
  cards: Array(4)
    .fill(0)
    .map(() => Object.assign({}, newRandomCard(), { key: uuidv4() })),
};

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(socket)),
  preloadedState: {
    hand: initialHand,
  },
});

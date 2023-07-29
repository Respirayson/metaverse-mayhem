// Import necessary Redux and middleware functions
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducers";
import { socketMiddleware } from "../utils/socketMiddleware";
import { socket } from "../utils/socket";

// Configuration for Redux Persist to store data in local storage
const persistConfig = {
  key: "root", // The key used to access the persisted data in local storage
  storage, // The storage method to use (in this case, 'storage' represents local storage)
};

// Wrap the rootReducer with Redux Persist to enable data persistence
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with persistedReducer and custom socket middleware
const store = configureStore({
  reducer: persistedReducer, // Set the rootReducer with Redux Persist
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(socketMiddleware(socket)), // Add the custom socketMiddleware
});

// Export the configured store
export default store;

// Create the persistor to enable data persistence
export const persistor = persistStore(store);

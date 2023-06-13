import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers";
import { newRandomCard } from "../utils/cards";
import { v4 as uuidv4 } from "uuid";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const logAction = (name) => {
  return (data) => {
    console.log(name, data);
  };
};

socket.on("connect", logAction("connect"));
socket.on("disconnect", logAction("disconnect"));
socket.on("play_card", (payload) => {
  console.log("Action has come through the socket ", payload.card);
});

const socketMiddleware = () => (next) => (action) => {
  if (action.type === "PLAY_CARD") {
    socket.emit("play_card", action);
  }
  return next(action);
};

const initialHand = {
  cards: Array(4)
    .fill(0)
    .map(() => Object.assign({}, newRandomCard(), { key: uuidv4() })),
};

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
  preloadedState: {
    hand: initialHand,
  },
});

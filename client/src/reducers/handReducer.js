import { v4 as uuidv4 } from "uuid";
import { newRandomCard } from "../utils/cards";
import { PLAY_CARD, DRAW_CARD } from "../actions/playerActions";
import { LOAD_HAND } from "../actions/gameActions";

const MAX_CARDS = 7;

/**
 * Reducer function that handles actions related to the player's hand.
 *
 * @param {Object} state - Current state of the player's hand.
 * @param {Object} action - Action object containing the type and payload.
 * @returns {Object} - Updated state of the player's hand.
 */
const handReducer = (state = { cards: [], deck: [] }, action) => {
  if (action.type === PLAY_CARD) {
    if (action.payload.source === "PLAYER") {
      const { length } = state.cards;

      const index = state.cards.findIndex(
        (item) => item === action.payload.card
      );

      return {
        ...state,
        cards: [
          ...state.cards.slice(0, index),
          ...state.cards.slice(index + 1, length),
        ],
      };
    }
  }

  if (action.type === DRAW_CARD) {
    if (action.payload.target === "PLAYER") {
      if (state.cards.length + 1 > MAX_CARDS) {
        return state;
      }
      if (state.deck === undefined || state.deck.length === 0) {
        const card = { ...newRandomCard(), key: uuidv4() };
        return { ...state, cards: [...state.cards, card] };
      }
      const card = { ...[...state.deck].sort().pop(), key: uuidv4() };
      return { ...state, cards: [...state.cards, card] };
    }
  }

  if (action.type === LOAD_HAND) {
    console.log(action.payload);
    return {
      deck: action.payload.deck,
      cards: action.payload.cards.sort(() => 0.5 - Math.random()).slice(0, 4),
    };
  }

  return state;
};

export default handReducer;

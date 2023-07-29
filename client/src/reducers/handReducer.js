import { v4 as uuidv4 } from 'uuid';
import { newRandomCard } from '../utils/cards';
import { PLAY_CARD, DRAW_CARD } from '../actions/playerActions';
import { LOAD_HAND } from '../actions/gameActions';

const MAX_CARDS = 7;

/**
 * Reducer function that handles actions related to the player's hand.
 *
 * @param {Object} state - Current state of the player's hand.
 * @param {Object} action - Action object containing the type and payload.
 * @returns {Object} - Updated state of the player's hand.
 */
const handReducer = (state = { cards: [], deck: [] }, action) => {
  // Check if the action is of type PLAY_CARD
  if (action.type === PLAY_CARD) {
    if (action.payload.source === 'PLAYER') {
      // Find the index of the card to be played in the player's hand
      const index = state.cards.findIndex((item) => item === action.payload.card);

      // Remove the card from the player's hand
      return {
        ...state,
        cards: [
          ...state.cards.slice(0, index),
          ...state.cards.slice(index + 1),
        ],
      };
    }
  }

  // Check if the action is of type DRAW_CARD
  if (action.type === DRAW_CARD) {
    if (action.payload.target === 'PLAYER') {
      // Check if the player's hand is already at maximum capacity
      if (state.cards.length + 1 > MAX_CARDS) {
        return state;
      }

      // Draw a new card from the deck or generate a random card if the deck is empty
      if (state.deck === undefined || state.deck.length === 0) {
        const card = { ...newRandomCard(), key: uuidv4() };
        return { ...state, cards: [...state.cards, card] };
      }

      const card = { ...state.deck[Math.floor(Math.random() * state.deck.length)], key: uuidv4() };
      return { ...state, cards: [...state.cards, card] };
    }
  }

  // Check if the action is of type LOAD_HAND
  if (action.type === LOAD_HAND) {
    // Shuffle the deck and draw the initial hand of cards for the player
    return {
      deck: action.payload.deck,
      cards: action.payload.cards.sort(() => 0.5 - Math.random()).slice(0, 4),
    };
  }

  // Return the current state for any unknown action types
  return state;
};

export default handReducer;

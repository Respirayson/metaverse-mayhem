import { PLAY_CARD, DRAW_CARD } from '../actions/playerActions';

const MAX_CARDS = 7;

/**
 * Reducer function that handles the count of cards in the opponent's hand.
 *
 * @param {number} state - Current count of cards in the opponent's hand.
 * @param {Object} action - Action object containing the type and payload.
 * @returns {number} - Updated count of cards in the opponent's hand.
 */
const opponentHandCountReducer = (state = 4, action) => {
  // Check if the action is of type PLAY_CARD
  if (action.type === PLAY_CARD) {
    // Check if the action is related to the opponent's hand
    if (action.payload.source === 'OPPONENT') {
      // Decrease the count of cards in the opponent's hand if it's not already 0
      return state === 0 ? state : state - 1;
    }
  }

  // Check if the action is of type DRAW_CARD
  if (action.type === DRAW_CARD) {
    // Check if the action is related to the opponent's hand
    if (action.payload.target === 'OPPONENT') {
      // Increase the count of cards in the opponent's hand if it's not already at the maximum limit
      return state === MAX_CARDS ? state : state + 1;
    }
  }

  // Return the current state for any unknown action types
  return state;
};

export default opponentHandCountReducer;

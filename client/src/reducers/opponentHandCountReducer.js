import { PLAY_CARD, DRAW_CARD } from '../actions/playerActions';

/**
 * Reducer function that handles the count of cards in the opponent's hand.
 *
 * @param {number} state - Current count of cards in the opponent's hand.
 * @param {Object} action - Action object containing the type and payload.
 * @returns {number} - Updated count of cards in the opponent's hand.
 */
const opponentHandCountReducer = (state = 4, action) => {
  if (action.type === PLAY_CARD) {
    if (action.payload.source === 'OPPONENT') {
      return state - 1;
    }
  }

  if (action.type === DRAW_CARD) {
    if (action.payload.target === 'OPPONENT') {
      return state + 1;
    }
  }

  return state;
};

export default opponentHandCountReducer;

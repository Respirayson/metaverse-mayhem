import { END_TURN, NEW_GAME } from '../actions/gameActions';

/**
 * Reducer function that handles the current turn state.
 *
 * @param {boolean} state - Current turn state (true for player's turn, false for opponent's turn).
 * @param {Object} action - Action object containing the type and payload.
 * @returns {boolean} - Updated turn state.
 */
const turnReducer = (state = true, action) => {
  if (action.type === END_TURN) {
    return !state;
  }

  if (action.type === NEW_GAME) {
    return action.payload.playerStarts;
  }

  return state;
};

export default turnReducer;

import { END_TURN, NEW_GAME } from '../actions/gameActions';

/**
 * Reducer function that handles the current turn state.
 *
 * @param {boolean} state - Current turn state (true for player's turn, false for opponent's turn).
 * @param {Object} action - Action object containing the type and payload.
 * @returns {boolean} - Updated turn state.
 */
const turnReducer = (state = true, action) => {
  // Check if the action is of type END_TURN
  if (action.type === END_TURN) {
    // Toggle the current turn state to switch between player's turn and opponent's turn
    return !state;
  }

  // Check if the action is of type NEW_GAME
  if (action.type === NEW_GAME) {
    // Set the turn state based on the value provided in the action's payload (playerStarts)
    // If playerStarts is true, it's the player's turn; if false, it's the opponent's turn
    return action.payload.playerStarts;
  }

  // Return the current state for any unknown action types
  return state;
};

export default turnReducer;

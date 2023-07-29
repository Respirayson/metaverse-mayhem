import { NEW_GAME } from '../actions/gameActions';

/**
 * Reducer function that handles the opponent's information.
 *
 * @param {string} state - Current opponent's information.
 * @param {Object} action - Action object containing the type and payload.
 * @returns {string} - Updated opponent's information.
 */
const opponentReducer = (state = 'Enemy', action) => {
  // Check if the action is of type NEW_GAME
  if (action.type === NEW_GAME) {
    // Set the opponent's information to the value provided in
    // the action's payload, or default to 'Enemy' if no value is provided
    return action.payload.opponent || 'Enemy';
  }

  // Return the current state for any unknown action types
  return state;
};

export default opponentReducer;

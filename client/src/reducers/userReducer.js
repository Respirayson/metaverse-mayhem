import { NEW_GAME } from '../actions/gameActions';

/**
 * Reducer function that handles the user state.
 *
 * @param {string} state - Current user state.
 * @param {Object} action - Action object containing the type and payload.
 * @returns {string} - Updated user state.
 */
const userReducer = (state = '', action) => {
  // Check if the action is of type NEW_GAME
  if (action.type === NEW_GAME) {
    // Set the user state based on the value provided in the action's payload (user)
    // If user is provided, use that value as the user state; otherwise, use the default value 'You'
    return action.payload.user || 'You';
  }

  // Return the current state for any unknown action types
  return state;
};

export default userReducer;

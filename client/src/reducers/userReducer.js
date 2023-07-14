import { NEW_GAME } from '../actions/gameActions';

/**
 * Reducer function that handles the user state.
 *
 * @param {string} state - Current user state.
 * @param {Object} action - Action object containing the type and payload.
 * @returns {string} - Updated user state.
 */
const userReducer = (state = '', action) => {
  if (action.type === NEW_GAME) {
    return action.payload.user || 'You';
  }

  return state;
};

export default userReducer;

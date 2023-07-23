import { NEW_GAME } from '../actions/gameActions';

/**
 * Reducer function that handles the opponent's information.
 *
 * @param {string} state - Current opponent's information.
 * @param {Object} action - Action object containing the type and payload.
 * @returns {string} - Updated opponent's information.
 */
const opponentReducer = (state = 'Enemy', action) => {
  if (action.type === NEW_GAME) {
    return action.payload.opponent || 'Enemy';
  }

  return state;
};

export default opponentReducer;

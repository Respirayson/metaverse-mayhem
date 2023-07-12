import {
  NEW_GAME_REQUEST,
  NEW_GAME_SUCCESS,
  NEW_GAME_FAILURE,
  UPDATE_HAS_OPPONENT,
  RESET_GAME,
} from '../actions/beforeGameActions';

/**
 * Initial state of the current game.
 * @type {Object}
 */
const initialState = {
  loading: false,
  gameId: '',
  hasOpponent: false,
  errors: [],
};

/**
 * Reducer function that handles actions related to the current game.
 *
 * @param {Object} state - Current state of the current game.
 * @param {Object} action - Action object containing the type and payload.
 * @returns {Object} - Updated state of the current game.
 */
const currentGameReducer = (state = initialState, action) => {
  if (action.type === NEW_GAME_REQUEST) {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === NEW_GAME_SUCCESS) {
    return {
      ...state,
      loading: false,
      gameId: action.payload.gameId,
    };
  }

  if (action.type === NEW_GAME_FAILURE) {
    return {
      ...state,
      errors: action.payload.errors,
    };
  }

  if (action.type === UPDATE_HAS_OPPONENT) {
    return {
      ...state,
      hasOpponent: action.payload.hasOpponent,
    };
  }

  if (action.type === RESET_GAME) {
    return initialState;
  }

  return state;
};

export default currentGameReducer;

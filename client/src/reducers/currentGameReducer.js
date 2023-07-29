import {
  NEW_GAME_REQUEST,
  NEW_GAME_SUCCESS,
  NEW_GAME_FAILURE,
  UPDATE_HAS_OPPONENT,
  RESET_GAME,
} from '../actions/beforeGameActions';
import { END_GAME } from '../actions/gameActions';

/**
 * Initial state of the current game.
 * @type {Object}
 */
const initialState = {
  loading: false,
  gameId: '',
  hasOpponent: false,
  gameOver: false,
  isPlayerWinner: false,
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
  // Check if the action is of type NEW_GAME_REQUEST
  if (action.type === NEW_GAME_REQUEST) {
    return {
      ...state,
      loading: true,
    };
  }

  // Check if the action is of type NEW_GAME_SUCCESS
  if (action.type === NEW_GAME_SUCCESS) {
    return {
      ...state,
      loading: false,
      gameId: action.payload.gameId,
    };
  }

  // Check if the action is of type NEW_GAME_FAILURE
  if (action.type === NEW_GAME_FAILURE) {
    return {
      ...state,
      errors: action.payload.errors,
    };
  }

  // Check if the action is of type UPDATE_HAS_OPPONENT
  if (action.type === UPDATE_HAS_OPPONENT) {
    return {
      ...state,
      hasOpponent: action.payload.hasOpponent,
    };
  }

  // Check if the action is of type RESET_GAME
  if (action.type === RESET_GAME) {
    return initialState;
  }

  // Check if the action is of type END_GAME
  if (action.type === END_GAME) {
    return {
      ...state,
      gameOver: true,
      isPlayerWinner: action.payload.isPlayerWinner,
    };
  }

  // Return the current state for any unknown action types
  return state;
};

export default currentGameReducer;


// Action types
export const NEW_GAME_SUCCESS = 'NEW_GAME_SUCCESS';
export const NEW_GAME_FAILURE = 'NEW_GAME_FAILURE';
export const NEW_GAME_REQUEST = 'NEW_GAME_REQUEST';
export const UPDATE_HAS_OPPONENT = 'UPDATE_HAS_OPPONENT';
export const RESET_GAME = 'RESET_GAME';

/**
 * Action creator for new game request.
 * @returns {object} Action object with type NEW_GAME_REQUEST.
 */
const newGameRequest = () => ({
  type: NEW_GAME_REQUEST,
});

/**
 * Action creator for new game success.
 * @param {string} gameId - The ID of the newly created game.
 * @returns {object} Action object with type NEW_GAME_SUCCESS and the gameId payload.
 */
const newGameSuccess = (gameId) => ({
  payload: {
    gameId,
  },
  type: NEW_GAME_SUCCESS,
});

/**
 * Action creator for new game failure.
 * @param {array} errors - An array of error messages.
 * @returns {object} Action object with type NEW_GAME_FAILURE and the errors payload.
 */
const newGameFailure = (errors) => ({
  payload: {
    errors,
  },
  type: NEW_GAME_FAILURE,
});

/**
 * Action creator for joining a game.
 * This function internally calls newGameSuccess action creator with the provided gameId.
 * @param {string} gameId - The ID of the game to join.
 * @returns {object} Action object created by newGameSuccess.
 */
const joinGame = (gameId) => newGameSuccess(gameId);

/**
 * Checks if a new game has already been fetched from the server.
 * @param {object} state - The current state of the application.
 * @param {boolean} force - Flag to force fetch a new game.
 * @returns {boolean} True if a new game needs to be fetched, false otherwise.
 */
const isNewGameFetched = (state, force) => {
  const { current } = state;

  if (force) {
    return true;
  }

  if (current.gameId) {
    return false;
  }

  return true;
};

/**
 * Action creator for updating the hasOpponent flag.
 * @param {boolean} hasOpponent - Flag indicating whether the game has an opponent.
 * @returns {object} Action object with type UPDATE_HAS_OPPONENT and the hasOpponent payload.
 */
const updateHasOpponent = (hasOpponent) => ({
  payload: {
    hasOpponent,
  },
  type: UPDATE_HAS_OPPONENT,
});

/**
 * Action creator for resetting the game state.
 * @returns {object} Action object with type RESET_GAME.
 */
const resetGame = () => ({
  type: RESET_GAME,
});

/**
 * Thunk action creator for fetching a new game from the server.
 * @param {boolean} force - Flag to force fetch a new game even if it has already been fetched.
 * @returns {function} Thunk function that can be dispatched.
 */
const fetchNewGame = (force = false) => (dispatch, getState) => {
  if (!isNewGameFetched(getState(), force)) {
    return undefined;
  }

  dispatch(newGameRequest());

  return fetch('https://metaverse-mayhem.onrender.com/api/v1/game/new', {
    method: 'POST',
  })
    .then((response) => response.json())
    .then((json) => {
      dispatch(newGameSuccess(json.gameId));
      return json.gameId;
    })
    .catch((error) => dispatch(newGameFailure(error)));
};

// Export an object with all the action creators
export default {
  fetchNewGame,
  newGameRequest,
  newGameSuccess,
  newGameFailure,
  joinGame,
  updateHasOpponent,
  resetGame,
  isNewGameFetched,
};

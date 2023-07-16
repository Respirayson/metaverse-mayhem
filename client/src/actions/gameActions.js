import allActions from '.';

// Action types
export const ADD_MAX_MANA = 'ADD_MAX_MANA';
export const ADD_PLAYABLE_MANA = 'ADD_PLAYABLE_MANA';
export const FILL_MANA = 'FILL_MANA';
export const USE_MANA = 'USE_MANA';
export const NEW_GAME = 'NEW_GAME';
export const END_TURN = 'END_TURN';
export const END_GAME = 'END_GAME';

/**
 * Action creator for adding maximum mana to a target.
 * @param {string} target - The target to add maximum mana to.
 * @param {number} amount - The amount of maximum mana to add (default: 1).
 * @param {boolean} viaServer - Flag indicating if the action is performed via the server.
 * @returns {object} Action object with type 'ADD_MAX_MANA' and the payload.
 */
const addMaxMana = (target, amount = 1, viaServer) => ({ payload: { target, amount, viaServer }, type: ADD_MAX_MANA });

/**
 * Action creator for adding playable mana to a target.
 * @param {string} target - The target to add playable mana to.
 * @param {number} amount - The amount of playable mana to add (default: 1).
 * @returns {object} Action object with type 'ADD_PLAYABLE_MANA' and the payload.
 */
const addPlayableMana = (target, amount = 1) => ({ payload: { target, amount }, type: ADD_PLAYABLE_MANA });

/**
 * Action creator for filling mana of a target.
 * @param {string} target - The target to fill mana for.
 * @param {boolean} viaServer - Flag indicating if the action is performed via the server.
 * @returns {object} Action object with type 'FILL_MANA' and the payload.
 */
const fillMana = (target, viaServer) => ({ payload: { target, viaServer }, type: FILL_MANA });

/**
 * Action creator for adding and filling mana for a target.
 * @param {string} target - The target to add and fill mana for.
 * @param {number} amount - The amount of mana to add (default: 1).
 * @param {boolean} viaServer - Flag indicating if the action is performed via the server.
 * @returns {function} Thunk function that dispatches addMaxMana and fillMana actions.
 */
const addAndFillMana = (target, amount = 1, viaServer) => (dispatch) => {
  dispatch(addMaxMana(target, amount, viaServer));
  dispatch(fillMana(target, viaServer));
};

/**
 * Action creator for using mana from a target.
 * @param {string} target - The target to use mana from.
 * @param {number} amount - The amount of mana to use.
 * @returns {object} Action object with type 'USE_MANA' and the payload.
 */
const useMana = (target, amount) => ({ payload: { target, amount }, type: USE_MANA });

/**
 * Thunk action creator for starting a new game.
 * @param {string} user - The user's ID.
 * @param {string} opponent - The opponent's ID.
 * @param {boolean} playerStarts - Flag indicating if the player starts the game.
 * @param {boolean} viaServer - Flag indicating if the action is performed via the server.
 * @returns {function} Thunk function that dispatches addAndFillMana and 'NEW_GAME' action.
 */
const newGame = (user, opponent, playerStarts, viaServer) => (dispatch) => {
  dispatch(addAndFillMana('PLAYER', 1, viaServer));
  dispatch({
    payload: {
      user, opponent, playerStarts, viaServer,
    },
    type: NEW_GAME,
  });
};

/**
 * Thunk action creator for ending the current turn.
 * @returns {function} Thunk function that dispatches 'END_TURN', addAndFillMana, and drawCard actions.
 */
const endTurn = () => (dispatch, getState) => {
  const { turn } = getState();
  const source = turn ? 'OPPONENT' : 'PLAYER';
  dispatch({ payload: { source }, type: END_TURN });
  dispatch(addAndFillMana(source));
  dispatch(allActions.playerActions.drawCard(source));
};

/**
 * Action creator for ending the game.
 * @param {string} target - The target of the game end (e.g., "PLAYER" or "OPPONENT").
 * @returns {object} Action object with type 'END_GAME' and the payload.
 */
const endGame = (target) => ({ payload: { isPlayerWinner: target }, type: END_GAME });

// Export an object with all the action creators
export default {
  newGame,
  endTurn,
  addMaxMana,
  addPlayableMana,
  fillMana,
  addAndFillMana,
  useMana,
  endGame,
};

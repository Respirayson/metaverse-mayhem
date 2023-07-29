import { PLAY_CARD } from '../actions/playerActions';

/**
 * Maximum number of cards allowed on the board.
 * @type {number}
 */
const MAX_CARDS = 7;

/**
 * Initial state of the game board.
 * @type {Object}
 */
const initialState = {
  Player: {
    board: [],
    exhaustedMinions: [],
  },
  Opponent: {
    board: [],
    exhaustedMinions: [],
  },
};

/**
 * Reducer function that handles actions related to the game board.
 *
 * @param {Object} state - Current state of the board.
 * @param {Object} action - Action object containing the type and payload.
 * @returns {Object} - Updated state of the board.
 */
const boardReducer = (state = initialState, action) => {
  // Check if the action is of type PLAY_CARD
  if (action.type === PLAY_CARD) {
    // Check if the action is for the PLAYER's board
    if (action.payload.source === 'PLAYER') {
      // Check if the PLAYER's board is already full
      if (state.Player.board.length === MAX_CARDS) {
        // Return the current state if the board is full
        return state;
      }
      // Check if the card should be added to the beginning (index 0) of the board
      if (action.payload.index === 0) {
        // Add the card to the beginning of the PLAYER's board and update exhaustedMinions list
        return {
          Opponent: state.Opponent,
          Player: {
            board: [
              action.payload.card,
              ...state.Player.board.slice(
                0,
                state.Player.board.length,
              ),
            ],
            exhaustedMinions: [
              ...state.Player.exhaustedMinions,
              action.payload.card.key,
            ],
          },
        };
      }
      // Add the card to the end of the PLAYER's board and update exhaustedMinions list
      return {
        Opponent: state.Opponent,
        Player: {
          board: [
            ...state.Player.board.slice(
              0,
              state.Player.board.length,
            ),
            action.payload.card,
          ],
          exhaustedMinions: [
            ...state.Player.exhaustedMinions,
            action.payload.card.key,
          ],
        },
      };
    }

    // Check if the action is for the OPPONENT's board
    if (action.payload.source === 'OPPONENT') {
      // Check if the OPPONENT's board is already full
      if (state.Opponent.board.length === MAX_CARDS) {
        // Return the current state if the board is full
        return state;
      }
      // Check if the card should be added to the beginning (index 0) of the board
      if (action.payload.index === 0) {
        // Add the card to the beginning of the OPPONENT's board and update exhaustedMinions list
        return {
          Player: state.Player,
          Opponent: {
            board: [
              action.payload.card,
              ...state.Opponent.board.slice(
                0,
                state.Opponent.board.length,
              ),
            ],
            exhaustedMinions: [
              ...state.Opponent.exhaustedMinions,
              action.payload.card.key,
            ],
          },
        };
      }
      // Add the card to the end of the OPPONENT's board and update exhaustedMinions list
      return {
        Player: state.Player,
        Opponent: {
          board: [
            ...state.Opponent.board.slice(
              0,
              state.Opponent.board.length,
            ),
            action.payload.card,
          ],
          exhaustedMinions: [
            ...state.Opponent.exhaustedMinions,
            action.payload.card.key,
          ],
        },
      };
    }
  }

  // Check if the action is of type KILL_MINION
  if (action.type === 'KILL_MINION') {
    // Check the source of the action to determine which board to update
    if (action.payload.source === 'PLAYER') {
      // Remove the specified minion from the OPPONENT's board
      const index = action.payload.key;
      return {
        Player: state.Player,
        Opponent: {
          ...state.Opponent,
          board: state.Opponent.board.filter(
            (card) => card.key !== index,
          ),
        },
      };
    }

    // Remove the specified minion from the PLAYER's board
    if (action.payload.source === 'OPPONENT') {
      const index = action.payload.key;
      return {
        Opponent: state.Opponent,
        Player: {
          ...state.Player,
          board: state.Player.board.filter(
            (card) => card.key !== index,
          ),
        },
      };
    }
  }

  // Check if the action is of type HIT_MINION
  if (action.type === 'HIT_MINION') {
    const { attack, minion, source } = action.payload;

    // Update the defense value of the targeted minion based on the attack value
    if (source === 'PLAYER') {
      return {
        Opponent: {
          ...state.Opponent,
          board: state.Opponent.board.map((card) => (card.key === minion.key
            ? { ...card, defense: card.defense - attack }
            : card)),
        },
        Player: state.Player,
      };
    }

    if (source === 'OPPONENT') {
      return {
        Player: {
          exhaustedMinions: [
            ...state.Player.exhaustedMinions,
            minion.key,
          ],
          board: state.Player.board.map((card) => (card.key === minion.key
            ? { ...card, defense: card.defense - attack }
            : card)),
        },
        Opponent: state.Opponent,
      };
    }
  }

  // Check if the action is of type END_TURN
  if (action.type === 'END_TURN') {
    // Clear the exhaustedMinions list for the current player to end their turn
    if (action.payload.source === 'PLAYER') {
      return {
        Opponent: state.Opponent,
        Player: {
          board: state.Player.board,
          exhaustedMinions: [],
        },
      };
    }

    if (action.payload.source === 'OPPONENT') {
      return {
        Player: state.Player,
        Opponent: {
          board: state.Opponent.board,
          exhaustedMinions: [],
        },
      };
    }
  }

  // Check if the action is of type HIT_FACE
  if (action.type === 'HIT_FACE') {
    // Add the attacking minion to the opponent's exhaustedMinions list
    if (action.payload.target === 'OPPONENT') {
      return {
        Opponent: state.Opponent,
        Player: {
          ...state.Player,
          exhaustedMinions: [
            ...state.Player.exhaustedMinions,
            action.payload.card.key,
          ],
        },
      };
    }

    // Add the attacking minion to the player's exhaustedMinions list
    if (action.payload.target === 'PLAYER') {
      return {
        Player: state.Player,
        Opponent: {
          ...state.Opponent,
          exhaustedMinions: [
            ...state.Opponent.exhaustedMinions,
            action.payload.card.key,
          ],
        },
      };
    }
  }

  // Return the current state for any unknown action types
  return state;
};

export default boardReducer;

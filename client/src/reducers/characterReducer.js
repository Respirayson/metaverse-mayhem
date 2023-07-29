import { HIT_FACE } from '../actions/playerActions';

import {
  ADD_MAX_MANA,
  ADD_PLAYABLE_MANA,
  FILL_MANA,
  USE_MANA,
} from '../actions/gameActions';

/**
 * Maximum amount of mana in each character.
 * @type {number}
 */
const MAX_MANA = 10;

/**
 * Initial state of the characters (player and enemy).
 * @type {Object}
 */
const initialState = {
  Player: {
    health: 30,
    mana: {
      current: 0,
      total: 0,
    },
  },
  Enemy: {
    health: 30,
    mana: {
      current: 0,
      total: 0,
    },
  },
};

/**
 * Reducer function that handles actions related to the characters' health and mana.
 *
 * @param {Object} state - Current state of the characters.
 * @param {Object} action - Action object containing the type and payload.
 * @returns {Object} - Updated state of the characters.
 */
const characterReducer = (state = initialState, action) => {
  // Check if the action is of type HIT_FACE
  if (action.type === HIT_FACE) {
    const damage = action.payload.card.attack;

    // Reduce the health of the target based on the damage dealt
    if (action.payload.target === 'PLAYER') {
      return {
        Enemy: state.Enemy,
        Player: {
          health: state.Player.health - damage,
          mana: state.Player.mana,
        },
      };
    } if (action.payload.target === 'OPPONENT') {
      return {
        Player: state.Player,
        Enemy: {
          health: state.Enemy.health - damage,
          mana: state.Enemy.mana,
        },
      };
    }
  }

  // Check if the action is of type ADD_MAX_MANA
  if (action.type === ADD_MAX_MANA) {
    // Increase the total mana of the target character, if not already at maximum
    if (action.payload.target === 'PLAYER') {
      if (state.Player.mana.total === MAX_MANA) {
        return state;
      }

      return {
        Enemy: state.Enemy,
        Player: {
          health: state.Player.health,
          mana: {
            current: state.Player.mana.current,
            total: state.Player.mana.total + action.payload.amount,
          },
        },
      };
    }

    if (action.payload.target === 'OPPONENT') {
      if (state.Enemy.mana.total === MAX_MANA) {
        return state;
      }

      return {
        Player: state.Player,
        Enemy: {
          health: state.Enemy.health,
          mana: {
            current: state.Enemy.mana.current,
            total: state.Enemy.mana.total + action.payload.amount,
          },
        },
      };
    }
  }

  // Check if the action is of type ADD_PLAYABLE_MANA
  if (action.type === ADD_PLAYABLE_MANA) {
    // Increase the current playable mana of the target character
    if (action.payload.target === 'PLAYER') {
      return {
        Enemy: state.Enemy,
        Player: {
          health: state.Player.health,
          mana: {
            current: state.Player.mana.current + action.payload.amount,
            total: state.Player.mana.total,
          },
        },
      };
    }

    if (action.payload.target === 'OPPONENT') {
      return {
        Player: state.Player,
        Enemy: {
          health: state.Enemy.health,
          mana: {
            current: state.Enemy.mana.current + action.payload.amount,
            total: state.Enemy.mana.total,
          },
        },
      };
    }
  }

  // Check if the action is of type FILL_MANA
  if (action.type === FILL_MANA) {
    // Fill the current playable mana to the total mana of the target character
    if (action.payload.target === 'PLAYER') {
      return {
        Enemy: state.Enemy,
        Player: {
          health: state.Player.health,
          mana: {
            current: state.Player.mana.total,
            total: state.Player.mana.total,
          },
        },
      };
    }

    if (action.payload.target === 'OPPONENT') {
      return {
        Player: state.Player,
        Enemy: {
          health: state.Enemy.health,
          mana: {
            current: state.Enemy.mana.total,
            total: state.Enemy.mana.total,
          },
        },
      };
    }
  }

  // Check if the action is of type USE_MANA
  if (action.type === USE_MANA) {
    // Reduce the current playable mana of the target character based on the amount used
    if (action.payload.target === 'PLAYER') {
      return {
        Enemy: state.Enemy,
        Player: {
          health: state.Player.health,
          mana: {
            current: state.Player.mana.current - action.payload.amount,
            total: state.Player.mana.total,
          },
        },
      };
    }

    if (action.payload.target === 'OPPONENT') {
      return {
        Player: state.Player,
        Enemy: {
          health: state.Enemy.health,
          mana: {
            current: state.Enemy.mana.current - action.payload.amount,
            total: state.Enemy.mana.total,
          },
        },
      };
    }
  }

  // Check if the action is of type END_GAME
  if (action.type === 'END_GAME') {
    // Mark the target character as the winner of the game
    if (action.payload.target === 'PLAYER') {
      return {
        Enemy: state.Enemy,
        Player: {
          health: state.Player.health,
          mana: state.Player.mana,
          winner: true,
        },
      };
    }

    if (action.payload.target === 'OPPONENT') {
      return {
        Player: state.Player,
        Enemy: {
          health: state.Enemy.health,
          mana: state.Enemy.mana,
          winner: true,
        },
      };
    }
  }

  // Return the current state for any unknown action types
  return state;
};

export default characterReducer;

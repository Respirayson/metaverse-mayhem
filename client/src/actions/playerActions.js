import gameActions from './gameActions';

// Action types
export const PLAY_CARD = 'PLAY_CARD';
export const DRAW_CARD = 'DRAW_CARD';
export const HIT_FACE = 'HIT_FACE';
export const HIT_MINION = 'HIT_MINION';
export const KILL_MINION = 'KILL_MINION';

/**
 * Action creator for playing a card.
 * @param {object} card - The card to be played.
 * @param {number} index - The index of the card.
 * @param {string} source - The source of the card (PLAYER or OPPONENT).
 * @param {boolean} viaServer - Flag indicating if the action is performed via the server.
 * @returns {object} Action object with type 'PLAY_CARD' and the payload.
 */
const playCard = (card, index, source, viaServer) => ({
  payload: {
    card, index, source, viaServer,
  },
  type: PLAY_CARD,
});

/**
 * Thunk action creator for spending mana and playing a card.
 * @param {object} card - The card to be played.
 * @param {number} index - The index of the card.
 * @param {string} source - The source of the card (PLAYER or OPPONENT).
 * @returns {function} Thunk function that dispatches playCard and gameActions.useMana actions.
 */
const spendManaAndPlayCard = (card, index, source) => (dispatch, getState) => {
  const player = source === 'PLAYER' ? 'Player' : 'Opponent';
  const currentMana = getState().character[player].mana.current;

  if (currentMana < card.mana) {
    return;
  }

  dispatch(playCard(card, index, source));
  dispatch(gameActions.useMana(source, card.mana));
};

/**
 * Action creator for drawing a card.
 * @param {string} target - The target to draw the card for.
 * @param {boolean} viaServer - Flag indicating if the action is performed via the server.
 * @returns {object} Action object with type 'DRAW_CARD' and the payload.
 */
const drawCard = (target, viaServer) => ({ payload: { target, viaServer }, type: DRAW_CARD });

/**
 * Action creator for hitting the opponent's face with a card.
 * @param {object} card - The card used to hit the face.
 * @param {string} target - The target to hit (PLAYER or OPPONENT).
 * @returns {object} Action object with type 'HIT_FACE' and the payload.
 */
const hitFace = (card, target) => ({ payload: { card, target }, type: HIT_FACE });

const attackHero = (card, target) => (dispatch, getState) => {
  dispatch(hitFace(card, target));
};

/**
 * Action creator for hitting a minion with a card.
 * @param {number} attack - The attack value of the card.
 * @param {object} target - The target minion to hit.
 * @param {object} source - The source minion that is attacking.
 * @returns {object} Action object with type 'HIT_MINION' and the payload.
 */
const hitMinion = (attack, minion, source) => ({ payload: { attack, minion, source }, type: HIT_MINION });

/**
 * Action creator for killing a minion.
 * @param {object} target - The target minion to kill.
 * @param {string} source - The source of the action (PLAYER or OPPONENT).
 * @returns {object} Action object with type 'KILL_MINION' and the payload.
 */
const killMinion = (target, source) => ({ payload: { key: target, source }, type: KILL_MINION });

/**
 * Thunk action creator for attacking a minion.
 * @param {number} attack - The attack value of the attacking minion.
 * @param {number} counterAttack - The counter-attack value of the target minion.
 * @param {object} target - The target minion to attack.
 * @param {object} source - The source minion that is attacking.
 * @returns {function} Thunk function that dispatches hitMinion and killMinion actions.
 */
const attackMinion = (attack, counterAttack, target, source) => (dispatch) => {
  dispatch(hitMinion(attack, target, 'PLAYER'));
  dispatch(hitMinion(counterAttack, source, 'OPPONENT'));

  if (attack >= target.defense) {
    dispatch(killMinion(target.key, 'PLAYER'));
  }

  if (counterAttack >= source.defense) {
    dispatch(killMinion(source.key, 'OPPONENT'));
  }
};

export default {
  playCard,
  drawCard,
  hitFace,
  attackMinion,
  killMinion,
  hitMinion,
  spendManaAndPlayCard,
  attackHero,
};

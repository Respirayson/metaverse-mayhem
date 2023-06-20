import { newRandomCard } from "../utils/cards";
import { v4 as uuidv4 } from "uuid";
import { PLAY_CARD, DRAW_CARD } from "../actions/playerActions";

const MAX_CARDS = 7;

/**
 * Reducer function that handles actions related to the player's hand.
 *
 * @param {Object} state - Current state of the player's hand.
 * @param {Object} action - Action object containing the type and payload.
 * @returns {Object} - Updated state of the player's hand.
 */
const handReducer = (state = {}, action) => {
    if (action.type === PLAY_CARD) {
        if (action.payload.source === "PLAYER") {
            const length = state.cards.length;

            const index = state.cards.findIndex(
                (item) => item === action.payload.card
            );

            return {
                cards: [
                    ...state.cards.slice(0, index),
                    ...state.cards.slice(index + 1, length),
                ],
            };
        }
    }

    if (action.type === DRAW_CARD) {
        if (action.payload.target === "PLAYER") {
            if (state.cards.length + 1 > MAX_CARDS) {
                console.log("hand is full");
                return { cards: state.cards };
            }

            const card = Object.assign({}, newRandomCard(), { key: uuidv4() });
            return { cards: [...state.cards, card] };
        }
    }

    return state;
};

export default handReducer;


const MAX_CARDS = 7;
const initialState = { 

    Player: {
        board: [],
    },
    Opponent: {
        board: [],
    }

 };

const boardReducer = (state = initialState, action) => {

    if (action.type === "PLAY_CARD") {
        if (action.payload.source === "PLAYER") {

            if (state.Player.board.length === MAX_CARDS) {
                return state;
            } else {
                if (action.payload.index === 0) {
                    return { Opponent: state.Opponent, Player: { board: [action.payload.card, ...state.Player.board.slice(0, state.Player.board.length)] } };
                } else {
                    return { Opponent: state.Opponent, Player: { board: [...state.Player.board.slice(0, state.Player.board.length), action.payload.card] } };
                }
            }
        }

        if (action.payload.source === "OPPONENT") {

            if (state.Opponent.board.length === MAX_CARDS) {
                return state;
            } else {
                if (action.payload.index === 0) {
                    return { Player: state.Player, Opponent: { board: [action.payload.card, ...state.Opponent.board.slice(0, state.Opponent.board.length)] } };
                } else {
                    return { Player: state.Player, Opponent: { board: [...state.Opponent.board.slice(0, state.Opponent.board.length), action.payload.card] } };
                }
            }
        }
    }

    if (action.type === "KILL_MINION") {

        if (action.payload.source === "PLAYER") {
            const index = action.payload.key;
            // console.log(index);
            return { Player: state.Player, Opponent: { board: state.Opponent.board.filter(card => card.key !== index) } };
        }

        if (action.payload.source === "OPPONENT") {
            const index = action.payload.key;
            // console.log(index);
            return { Opponent: state.Opponent, Player: { board: state.Player.board.filter(card => card.id !== index) } };
        }

    }

    if (action.type === "HIT_MINION") {

        const { attack, counterAttack, source, target } = action.payload;
        console.log(state);
        return {
            Player: {
                board: state.Player.board.map(card => card === source ? { ...card, defense: card.defense - counterAttack } : card)
            },
            Opponent: {
                board: state.Opponent.board.map(card => card === target ? { ...card, defense: card.defense - attack } : card)
            }
        }

    }

    return state;

}

export default boardReducer;

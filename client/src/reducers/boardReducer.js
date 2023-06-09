
const MAX_CARDS = 7;
const initialState = { 

    Player: {
        board: [],
        exhaustedMinions: [],
    },
    Opponent: {
        board: [],
        exhaustedMinions: [],
    }

 };

const boardReducer = (state = initialState, action) => {

    if (action.type === "PLAY_CARD") {
        if (action.payload.source === "PLAYER") {

            if (state.Player.board.length === MAX_CARDS) {
                return state;
            } else {
                if (action.payload.index === 0) {
                    return { 
                        Opponent: state.Opponent, 
                        Player: { 
                            board: [action.payload.card, ...state.Player.board.slice(0, state.Player.board.length)],
                            exhaustedMinions: [...state.Player.exhaustedMinions, action.payload.card.key]
                        } 
                    };
                } else {
                    return { 
                        Opponent: state.Opponent, 
                        Player: { 
                            board: [...state.Player.board.slice(0, state.Player.board.length), action.payload.card],
                            exhaustedMinions: [...state.Player.exhaustedMinions, action.payload.card.key]
                        }
                    };
                }
            }
        }

        if (action.payload.source === "OPPONENT") {

            if (state.Opponent.board.length === MAX_CARDS) {
                return state;
            } else {
                if (action.payload.index === 0) {
                    return { Player: state.Player, Opponent: { 
                        board: [action.payload.card, ...state.Opponent.board.slice(0, state.Opponent.board.length)],
                        exhaustedMinions: [...state.Opponent.exhaustedMinions, action.payload.card.key]
                     } };
                } else {
                    return { Player: state.Player, Opponent: { 
                        board: [...state.Opponent.board.slice(0, state.Opponent.board.length), action.payload.card],
                        exhaustedMinions: [...state.Opponent.exhaustedMinions, action.payload.card.key]
                    } };
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
            return { Opponent: state.Opponent, Player: { board: state.Player.board.filter(card => card.key !== index) } };
        }

    }

    if (action.type === "HIT_MINION") {

        const { attack, target, source } = action.payload;
        console.log(state);

        if (source === "PLAYER") {
            return {
                Opponent: {
                    board: state.Opponent.board.map(card => card === target ? { ...card, defense: card.defense - attack } : card)
                },
                Player: state.Player
            }
        } 
        
        if (source === "OPPONENT") {
            return {
                Player: {
                    board: state.Player.board.map(card => card === target ? { ...card, defense: card.defense - attack } : card)
                },
                Opponent: state.Opponent
            }
        }

        

    }

    if (action.type === "END_TURN") {
        if (action.payload.source === "PLAYER") {
            return { Opponent: state.Opponent, Player: { 
                board: state.Player.board,
                exhaustedMinions: []
            } };
        }

        if (action.payload.source === "OPPONENT") {
            return { Player: state.Player, Opponent: { 
                board: state.Opponent.board,
                exhaustedMinions: []
            } };
        }
    }
    
    return state;

}

export default boardReducer;

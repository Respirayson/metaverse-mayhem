const MAX_CARDS = 7;
const initialState = { board: [] };

const boardReducer = (state = initialState, action) => {

    if (action.type === "PLAY_CARD") {

        if (state.board.length === MAX_CARDS) {
            return state;
        } else {
            if (action.payload.index === 0) {
                return { board: [action.payload.card, ...state.board.slice(0, state.board.length)] };
            } else {
                return { board: [...state.board.slice(0, state.board.length), action.payload.card] };
            }
        }
        
    }
    return state;

}

export default boardReducer;

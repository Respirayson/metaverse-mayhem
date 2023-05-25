const MAX_CARDS = 7;
const initialState = { board: Array(MAX_CARDS).fill(null) };

const boardReducer = (state = initialState, action) => {

    const findEmptyIndex = (board) => {
        for (let i = 0; i < MAX_CARDS; i++) {
            if (board[i] === null) {
                return i;
            }
        }
        return -1;
    }

    if (action.type === "PLAY_CARD") {
        
        const index = findEmptyIndex(state.board);
        if (index === -1) {
            return state;
        } else {
            const newBoard = [...state.board.slice(0, index), 
                action.payload.card, 
                ...state.board.slice(index + 1, state.board.length)];
            return { board: newBoard };
        }
        
    }
    return state;

}

export default boardReducer;

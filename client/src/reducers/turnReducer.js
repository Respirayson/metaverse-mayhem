
const turnReducer = (state=true, action) => {
    
    if (action.type === "END_TURN") {
        return !state;
    }

    if (action.type === "NEW_GAME") {
        return action.payload.playerStarts;
    }

    return state;
}

export default turnReducer;
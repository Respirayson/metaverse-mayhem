
const turnReducer = (state=true, action) => {
    
    if (action.type === "END_TURN") {
        return !state;
    }

    return state;
}

export default turnReducer;
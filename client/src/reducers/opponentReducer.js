
const opponentReducer = (state = "", action) => {

    if (action.type === 'NEW_GAME') {
      return action.payload.opponent
    }
  
    return state;

}

export default opponentReducer;
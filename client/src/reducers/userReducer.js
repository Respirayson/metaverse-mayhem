
const userReducer = (state = "", action) => {

    if (action.type === 'NEW_GAME') {
      return action.payload.user;
    }
  
    return state;

}

export default userReducer;
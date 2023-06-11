import allActions from ".";

const addMana = (target, amount = 1) => {
    return { payload: { target, amount }, type: 'ADD_MANA' };
}

const newGame = (user, opponent, playerStarts) => {

    return dispatch => {
        
        const starting = playerStarts ? "PLAYER" : "OPPONENT";
        dispatch(addMana(starting));

        return dispatch({ payload: { user, opponent, playerStarts }, type: 'NEW_GAME' });
        
    }
}

const endTurn = () => {

    return (dispatch, getState) => {

        const { turn } = getState();

        const source = turn ? "OPPONENT" : "PLAYER";

        dispatch({ payload: { source }, type: 'END_TURN' });
        dispatch(addMana(source));
        dispatch(allActions.playerActions.drawCard(source));
    }

    // return { payload: { source }, type: 'END_TURN' };
}

export default {
    newGame,
    endTurn,
    addMana
};
import allActions from ".";

const addMaxMana = (target, amount = 1) => {
    return { payload: { target, amount }, type: 'ADD_MAX_MANA' };
}

const addPlayableMana = (target, amount = 1) => {
    return { payload: { target, amount }, type: 'ADD_PLAYABLE_MANA' };
}

const fillMana = (target) => {
    return { payload: { target }, type: 'FILL_MANA' };
}

const addAndFillMana = (target, amount = 1) => {
    return dispatch => {
        dispatch(addMaxMana(target, amount));
        dispatch(fillMana(target));
    }
}

const useMana = (target, amount) => {
    return { payload: { target, amount }, type: 'USE_MANA' };
}

const newGame = (user, opponent, playerStarts) => {

    return dispatch => {
        
        const starting = playerStarts ? "PLAYER" : "OPPONENT";
        dispatch(addAndFillMana(starting));

        return dispatch({ payload: { user, opponent, playerStarts }, type: 'NEW_GAME' });
        
    }
}

const endTurn = () => {

    return (dispatch, getState) => {

        const { turn } = getState();

        const source = turn ? "OPPONENT" : "PLAYER";

        dispatch({ payload: { source }, type: 'END_TURN' });
        dispatch(addAndFillMana(source));
        dispatch(allActions.playerActions.drawCard(source));
    }
}

export default {
    newGame,
    endTurn,
    addMaxMana,
    addPlayableMana,
    fillMana,
    addAndFillMana,
    useMana
};
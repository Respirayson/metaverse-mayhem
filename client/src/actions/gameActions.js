
const newGame = (user, opponent) => {
    return { payload: { user, opponent }, type: 'NEW_GAME' };
}

const endTurn = (source) => {
    return { payload: { source }, type: 'END_TURN' };
}

export default {
    newGame,
    endTurn
};
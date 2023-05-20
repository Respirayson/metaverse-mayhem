
const newGame = (user, opponent) => {
    return { payload: { user, opponent }, type: 'NEW_GAME' };
}

export default {
    newGame
};
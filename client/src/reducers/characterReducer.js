const initialState = {
    Player: {
        health: 30,
        mana: 1,
    },
    Enemy: {
        health: 15,
        mana: 1,
    }
}

const characterReducer = (state = initialState, action) => {

    if (action.type === "HIT_FACE") {
        const damage = action.payload.damage;
        if (action.payload.target === "PLAYER") {
            return { Enemy: state.Enemy, Player: { health: state.Player.health - damage, mana: state.Player.mana } };
        } else if (action.payload.target === "OPPONENT") {
            return { Player: state.Player, Enemy: { health: state.Enemy.health - damage, mana: state.Enemy.mana } };
        }
    }

    return state;

}

export default characterReducer
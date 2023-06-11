const initialState = {
    Player: {
        health: 30,
        mana: {
            current: 0,
            total: 0
        }
    },
    Enemy: {
        health: 15,
        mana: {
            current: 0,
            total: 0
        }
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

    if (action.type === "ADD_MANA") {

        if (action.payload.target === "PLAYER") {
            return { Enemy: state.Enemy, 
                Player: { 
                    health: state.Player.health, 
                    mana: { 
                        current: state.Player.mana.current + action.payload.amount, 
                        total: state.Player.mana.total + action.payload.amount 
                    } 
                } 
            };
        }

        if (action.payload.target === "OPPONENT") {
            return { Player: state.Player, 
                Enemy: { 
                    health: state.Enemy.health, 
                    mana: { 
                        current: state.Enemy.mana.current + action.payload.amount, 
                        total: state.Enemy.mana.total + action.payload.amount 
                    } 
                } 
            };
        }

    }

    return state;

}

export default characterReducer
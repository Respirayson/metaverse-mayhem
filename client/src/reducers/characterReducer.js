const initialState = {
	Player: {
		health: 30,
		mana: {
			current: 0,
			total: 0,
		},
	},
	Enemy: {
		health: 30,
		mana: {
			current: 0,
			total: 0,
		},
	},
};

export const HIT_FACE = "HIT_FACE";
export const ADD_MAX_MANA = "ADD_MAX_MANA";
export const ADD_PLAYABLE_MANA = "ADD_PLAYABLE_MANA";
export const FILL_MANA = "FILL_MANA";
export const USE_MANA = "USE_MANA";

const characterReducer = (state = initialState, action) => {
	if (action.type === HIT_FACE) {
		const damage = action.payload.card.attack;

		if (action.payload.target === "PLAYER") {
			return {
				Enemy: state.Enemy,
				Player: {
					health: state.Player.health - damage,
					mana: state.Player.mana,
				},
			};
		} else if (action.payload.target === "OPPONENT") {
			return {
				Player: state.Player,
				Enemy: {
					health: state.Enemy.health - damage,
					mana: state.Enemy.mana,
				},
			};
		}
	}

	if (action.type === ADD_MAX_MANA) {
		if (action.payload.target === "PLAYER") {
			return {
				Enemy: state.Enemy,
				Player: {
					health: state.Player.health,
					mana: {
						current: state.Player.mana.current,
						total: state.Player.mana.total + action.payload.amount,
					},
				},
			};
		}

		if (action.payload.target === "OPPONENT") {
			return {
				Player: state.Player,
				Enemy: {
					health: state.Enemy.health,
					mana: {
						current: state.Enemy.mana.current,
						total: state.Enemy.mana.total + action.payload.amount,
					},
				},
			};
		}
	}

	if (action.type === ADD_PLAYABLE_MANA) {
		if (action.payload.target === "PLAYER") {
			return {
				Enemy: state.Enemy,
				Player: {
					health: state.Player.health,
					mana: {
						current:
							state.Player.mana.current + action.payload.amount,
						total: state.Player.mana.total,
					},
				},
			};
		}

		if (action.payload.target === "OPPONENT") {
			return {
				Player: state.Player,
				Enemy: {
					health: state.Enemy.health,
					mana: {
						current:
							state.Enemy.mana.current + action.payload.amount,
						total: state.Enemy.mana.total,
					},
				},
			};
		}
	}

	if (action.type === FILL_MANA) {
		if (action.payload.target === "PLAYER") {
			return {
				Enemy: state.Enemy,
				Player: {
					health: state.Player.health,
					mana: {
						current: state.Player.mana.total,
						total: state.Player.mana.total,
					},
				},
			};
		}

		if (action.payload.target === "OPPONENT") {
			return {
				Player: state.Player,
				Enemy: {
					health: state.Enemy.health,
					mana: {
						current: state.Enemy.mana.total,
						total: state.Enemy.mana.total,
					},
				},
			};
		}
	}

	if (action.type === USE_MANA) {
		if (action.payload.target === "PLAYER") {
			return {
				Enemy: state.Enemy,
				Player: {
					health: state.Player.health,
					mana: {
						current:
							state.Player.mana.current - action.payload.amount,
						total: state.Player.mana.total,
					},
				},
			};
		}

		if (action.payload.target === "OPPONENT") {
			return {
				Player: state.Player,
				Enemy: {
					health: state.Enemy.health,
					mana: {
						current:
							state.Enemy.mana.current - action.payload.amount,
						total: state.Enemy.mana.total,
					},
				},
			};
		}
	}

    if (action.type === "END_GAME") {
        if (action.payload.target === "PLAYER") {
            return {
                Enemy: state.Enemy,
                Player: {
                    health: state.Player.health,
                    mana: state.Player.mana,
                    winner: true,
                },
            };
        }

        if (action.payload.target === "OPPONENT") {
            return {
                Player: state.Player,
                Enemy: {
                    health: state.Enemy.health,
                    mana: state.Enemy.mana,
                    winner: true,
                },
            };
        }
    }

	return state;
};

export default characterReducer;

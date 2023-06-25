const opponentHandCountReducer = (state = 4, action) => {
	if (action.type === "PLAY_CARD") {
		if (action.payload.source === "OPPONENT") {
			return state - 1;
		}
	}

	if (action.type === "DRAW_CARD") {
		if (action.payload.target === "OPPONENT") {
			return state + 1;
		}
	}

	return state;
};

export default opponentHandCountReducer;

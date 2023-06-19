import allActions from "../actions";

const logAction = (name) => {
	return (data) => {
		console.log(name, data);
	};
};

export const socketActions = (dispatch, socket) => {
	socket.on("connect", logAction("connect"));

	socket.on("disconnect", logAction("disconnect"));

	socket.on("action", (payload) => {
		const { action } = payload;
		console.log("Action has come through the socket ", action);

		dispatch({ viaServer: true, ...action });
	});

	socket.on("newGame", (payload) => {
		const { opponentName, isStarting } = payload;
		dispatch(
			allActions.gameActions.newGame("You", opponentName, isStarting, true)
		);
	});

	socket.on("playerJoined", (payload) => {
		const { playerCount } = payload;
		console.log("playerCount", playerCount);
	});
};

import React from "react";
import { useDispatch } from "react-redux";
import allActions from "../actions";
import { Player } from "../components";

const PlayerContainer = ({
	name,
	board,
	character,
	playerTurn,
	onClick,
	turn,
}) => {
	const dispatch = useDispatch();

	const drawCard = () => {
		dispatch(allActions.playerActions.drawCard("PLAYER"));
	};

	return (
		<Player
			name={name}
			board={board}
			character={character}
			playerTurn={playerTurn}
			onClick={onClick}
			turn={turn}
			drawCard={drawCard}
		/>
	);
};

export default PlayerContainer;

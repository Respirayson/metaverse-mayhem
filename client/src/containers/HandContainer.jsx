import React from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../actions";
import { Hand } from "../components";

const HandContainer = ({ playerTurn, currentMana }) => {
	const cards = useSelector((state) => state.hand.cards);
	const dispatch = useDispatch();

	const playCard = (card, index) => {
		dispatch(
			allActions.playerActions.spendManaAndPlayCard(card, index, "PLAYER")
		);
	};

	return (
		<Hand
			cards={cards}
			currentMana={currentMana}
			playerTurn={playerTurn}
			playCard={playCard}
		/>
	);
};

export default HandContainer;

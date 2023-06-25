// Hand.js

import React from "react";
import { PlayerCard } from "../../containers";
import { v4 as uuidv4 } from "uuid";


const Hand = ({ playerTurn, currentMana, cards, playCard }) => {
	const cardsList = cards.map((card, index) => (
		<PlayerCard
			currentMana={currentMana}
			canDrag={playerTurn}
			card={card}
			key={uuidv4()} // Use the card's ID as the key instead of generating a new UUID
			onCardClick={playCard}
			cardsLength={cards.length}
			index={index}
		/>
	));

	return (
		<div className="flex flex-row justify-center items-center h-[260px]">
			{cardsList}
		</div>
	);
};

export default Hand;

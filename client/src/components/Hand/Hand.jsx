import React from "react";
import { PlayerCard } from "../../containers";
import { v4 as uuidv4 } from "uuid";

/**
 * Component representing the player's hand of cards
 * @param {object} props - The component props
 * @param {boolean} props.playerTurn - Flag indicating if it's the player's turn
 * @param {number} props.currentMana - The current mana of the player
 * @param {Array} props.cards - The cards in the player's hand
 * @param {function} props.playCard - Function to handle playing a card
 * @returns {JSX.Element} - The JSX element
 */
const Hand = ({ playerTurn, currentMana, cards, playCard }) => {
    const cardsList = cards.map((card, index) => (
        <PlayerCard
            currentMana={currentMana}
            canDrag={playerTurn}
            card={card}
            key={uuidv4()}
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

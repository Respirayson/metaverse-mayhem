import { v4 as uuidv4 } from 'uuid';
import { PlayerCard } from '../../containers';

/**
 * Component representing the player's hand of cards
 * @param {object} props - The component props
 * @param {boolean} props.playerTurn - Flag indicating if it's the player's turn
 * @param {number} props.currentMana - The current mana of the player
 * @param {Array} props.cards - The cards in the player's hand
 * @param {function} props.playCard - Function to handle playing a card
 * @returns {JSX.Element} - The JSX element
 */
function Hand({
  playerTurn, currentMana, cards, playCard,
}) {
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
    <div className="flex flex-row justify-center items-center h-[180px] z-30 relative my-10">
      {cardsList}
    </div>
  );
}

export default Hand;

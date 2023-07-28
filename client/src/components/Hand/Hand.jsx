import { v4 as uuidv4 } from 'uuid';
import { PlayerCard } from '../../containers';

/**
 * Hand component represents the player's hand of cards.
 *
 * @component
 * @param {object} props - The component props.
 * @param {boolean} props.playerTurn - Flag indicating if it's the player's turn.
 * @param {number} props.currentMana - The current mana of the player.
 * @param {Array} props.cards - The cards in the player's hand.
 * @param {function} props.playCard - Function to handle playing a card.
 * @returns {JSX.Element} The JSX element representing the Hand component.
 */
function Hand({
  playerTurn, currentMana, cards, playCard,
}) {
  /**
   * Creates an array of JSX elements representing the player's cards.
   * @type {JSX.Element[]}
   */
  const cardsList = cards.map((card, index) => (
    <PlayerCard
      key={uuidv4()}
      currentMana={currentMana}
      canDrag={playerTurn}
      card={card}
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

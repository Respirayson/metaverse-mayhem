import { useDrag } from 'react-dnd';
import { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import itemTypes from '../constants';
import { Card } from '../components';

/**
 * Component for a player's card.
 * @param {Object} props - Component props.
 * @param {Object} props.card - The card object.
 * @param {number} props.index - The index of the card.
 * @param {number} props.cardsLength - The total number of cards.
 * @param {boolean} props.canDrag - Indicates if the card can be dragged.
 * @param {function} props.onCardClick - Function to handle card click.
 * @param {number} props.currentMana - The current mana of the player.
 * @returns {JSX.Element} PlayerCard component.
 */
function PlayerCard({
  card,
  index,
  cardsLength,
  canDrag,
  onCardClick,
  currentMana,
}) {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: itemTypes.CARD,
      canDrag: canDrag && card.mana <= currentMana,
      item: { card, index, playCard: onCardClick },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [canDrag, card, currentMana],
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div ref={drag} className={`pt-[120px] ${isDragging ? 'opacity-0' : 'opacity: 1'}`}>
      <Card
        canDrag={canDrag && card.mana <= currentMana}
        card={card}
        cardsLength={cardsLength}
        index={index}
      />
    </div>
  );
}

export default PlayerCard;

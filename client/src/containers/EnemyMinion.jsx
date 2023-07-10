import { useDrop } from 'react-dnd';
import { Minion } from '../components';
import itemTypes from '../constants';

/**
 * Component for rendering an enemy minion.
 * @param {Object} props - Component props.
 * @param {Object} props.card - The enemy minion card object.
 * @param {Function} props.attackMinion - Function to attack a minion.
 * @param {Array} props.exhaustedMinions - Array of exhausted minions.
 * @param {boolean} props.turn - Indicates if it's the player's turn.
 * @returns {JSX.Element} EnemyMinion component.
 */
function EnemyMinion({
  card, attackMinion, exhaustedMinions, turn,
}) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: itemTypes.MINION,
      drop: (item) => {
        const { attack } = item.card;
        attackMinion(attack, card.attack, card, item.card);
      },

      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [card],
  );

  return (
    <div ref={drop}>
      <Minion
        card={card}
        exhausted={exhaustedMinions.includes(card.key) || !turn}
        isOver={isOver}
      />
    </div>
  );
}

export default EnemyMinion;

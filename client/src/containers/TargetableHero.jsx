import { useDrop } from 'react-dnd';
import { Hero } from '../components';
import itemTypes from '../constants';

/**
 * Component representing a targetable hero.
 * @param {Object} props - Component props.
 * @param {Object} props.character - The hero character.
 * @param {Function} props.hitFace - Function to handle hitting the opponent's face.
 * @returns {JSX.Element} TargetableHero component.
 */
function TargetableHero(props) {
  /**
     * Hook to enable dropping functionality for minions onto the hero.
     */
  const [, drop] = useDrop(
    () => ({
      accept: itemTypes.MINION,
      drop: (item) => {
        props.hitFace(item.card, 'OPPONENT');
      },

      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [props],
  );

  return (
    <div ref={drop} className="flex h-16" data-testid="targetable-hero">
      <Hero character={props.character} />
    </div>
  );
}

export default TargetableHero;

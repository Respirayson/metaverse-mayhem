import { useDrop } from 'react-dnd';
import { Hero } from '../components';
import itemTypes from '../constants';
import sparcle, { getCoords } from '../utils/animations';

/**
 * Component representing a targetable hero.
 * @param {Object} props - Component props.
 * @param {Object} props.character - The hero character.
 * @param {Function} props.hitFace - Function to handle hitting the opponent's face.
 * @returns {JSX.Element} TargetableHero component.
 */
function TargetableHero({
  hitFace, character, name, isOpponent, heroRef, getCoords,
}) {
  /**
   * Hook to enable dropping functionality for minions onto the hero.
   */
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: itemTypes.MINION,
      drop: (item) => {
        hitFace(item.card, 'OPPONENT');
      },

      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [hitFace],
  );

  return (
    <div ref={drop} data-testid="targetable-hero">
      <Hero
        heroRef={heroRef}
        character={character}
        name={name}
        isOpponent={isOpponent}
        isOver={isOver}
        getCoords={getCoords}
      />
    </div>
  );
}

export default TargetableHero;

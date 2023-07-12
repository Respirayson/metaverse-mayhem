import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { Minion } from '../components';
import itemTypes from '../constants';

/**
 * Component for a player's minion.
 * @param {Object} props - Component props.
 * @param {Object} props.card - The minion card.
 * @param {boolean} props.exhausted - Indicates if the minion is exhausted.
 * @param {boolean} props.canDrag - Indicates if the minion can be dragged.
 * @returns {JSX.Element} PlayerMinion component.
 */
function PlayerMinion({ card, exhausted, canDrag }) {
  /**
     * Hook to enable dragging functionality for the minion.
     */
  const [, drag, preview] = useDrag(
    () => ({
      canDrag: () => {
        if (exhausted) {
          return false;
        }
        return canDrag;
      },
      type: itemTypes.MINION,
      item: { card },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [card, exhausted, canDrag],
  );

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return (
    <div ref={drag} className="cursor-pointer relative">
      <Minion card={card} exhausted={exhausted || !canDrag} />
    </div>
  );
}

export default PlayerMinion;

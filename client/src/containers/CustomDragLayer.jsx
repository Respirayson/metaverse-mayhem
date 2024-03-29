import { useDragLayer } from 'react-dnd';
import { Card, Minion } from '../components';
import itemTypes from '../constants';

/**
 * Custom drag layer component.
 * Renders a draggable item during a drag operation.
 * @returns {JSX.Element} CustomDragLayer component.
 */
function CustomDragLayer() {
  const {
    itemType, isDragging, item, initialOffset, currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  };

  /**
   * Calculates the styles for the draggable item.
   * @param {Object} initialOffset - The initial offset of the drag.
   * @param {Object} currentOffset - The current offset of the drag.
   * @returns {Object} Styles object for the draggable item.
   */
  const getItemStyles = (iOffset, cOffset) => {
    if (!iOffset || !cOffset) {
      return {
        display: 'none',
      };
    }

    const { x, y } = cOffset;
    const transform = `translate(${x}px, ${y}px)`;
    return {
      transform,
      WebkitTransform: transform,
    };
  };

  /**
   * Renders the draggable item based on the item type.
   * @returns {JSX.Element | null} Draggable item component.
   */
  const renderItem = () => {
    switch (itemType) {
      case itemTypes.CARD:
        return <Card card={item.card} canDrag />;
      case itemTypes.MINION:
        return (
          <div className="h-[80px] w-[76px]">
            <Minion card={item.card} />
          </div>
        );
      default:
        return null;
    }
  };

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </div>
  );
}

export default CustomDragLayer;

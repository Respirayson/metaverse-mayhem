import styles from './PlayingArea.module.css';

/**
 * Component for rendering the playing area where minions are placed.
 * @param {Object} props - Component props.
 * @param {React.Ref} props.dropRef - Reference for the drop area.
 * @param {JSX.Element[]} props.minions - Array of minion components.
 * @param {boolean} props.isOver - Indicates if a draggable item is being dragged over the playing area.
 * @returns {JSX.Element} PlayingArea component.
 */
function PlayingArea({ dropRef, minions, isOver }) {
  return (
    <div
      data-testid="dropBoard"
      ref={dropRef}
      className="flex flex-row items-center justify-center w-full h-[180px] relative z-10"
    >
      {minions}
      {isOver && <div className={styles.PlayingArea} />}
    </div>
  );
}

export default PlayingArea;

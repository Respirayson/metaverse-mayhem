import { useLayoutEffect, useRef } from 'react';
import styles from './Minion.module.css';
import sparkle, { getPlayerCoords } from '../../utils/animations';

/**
 * Component for rendering a minion card.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.card - Minion card data.
 * @param {number} props.card.attack - The attack value of the minion card.
 * @param {number} props.card.defense - The defense value of the minion card.
 * @param {string} props.card.portrait - The URL of the portrait image for the minion card.
 * @param {boolean} props.exhausted - Flag indicating if the minion is exhausted.
 * @param {boolean} props.isOver - Flag indicating if the minion is being hovered over.
 * @returns {JSX.Element} Minion component.
 */
function Minion(props) {
  const { card, exhausted, isOver } = props;
  const { attack, defense, portrait } = card;

  const previousDefense = useRef(defense);
  const reference = useRef(null);

  useLayoutEffect(() => {
    const elem = reference;
    if (reference?.current && previousDefense.current !== defense) {
      sparkle(getPlayerCoords(reference));
    }
    return () => {
      if (elem?.current) {
        sparkle(getPlayerCoords(elem));
      }
    };
  }, [defense]);

  return (
    <div
      ref={reference}
      className={`${styles.Minion} bg-[image:var(--image-url)] ${
        exhausted ? styles.MinionSleeping : styles.MinionAwake
      }`}
      style={{ '--image-url': `url(${portrait})` }}
    >
      {isOver && (
        <div className="absolute bg-red-500 w-full h-full bg-opacity-50 rounded-full" />
      )}
      <div className={`${styles.MinionAttack} text-[2.5vh]`}>{attack}</div>
      <div className={`${styles.MinionDefense} text-[2.5vh]`}>{defense}</div>
    </div>
  );
}

export default Minion;

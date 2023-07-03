 
import styles from "./Minion.module.css";

/**
 * Component for rendering a minion card.
 * @param {Object} props - Component props.
 * @param {Object} props.card - Minion card data.
 * @param {boolean} props.exhausted - Flag indicating if the minion is exhausted.
 * @returns {JSX.Element} Minion component.
 */
const Minion = (props) => {
    const { card, exhausted } = props;
    const { attack, defense, portrait } = card;

    return (
        <div
            className={`${styles.Minion} bg-[image:var(--image-url)] ${
                exhausted ? styles.MinionSleeping : styles.MinionAwake
            }`}
            style={{ "--image-url": `url(${portrait})` }}
        >
            <div className={`${styles.MinionAttack} text-[2.5vh]`}>
                {attack}
            </div>
            <div className={`${styles.MinionDefense} text-[2.5vh]`}>
                {defense}
            </div>
        </div>
    );
};

export default Minion;

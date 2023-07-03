import styles from "../Card/Card.module.css";
import cardBackStyles from "./CardBack.module.css";

/**
 * Component representing the back side of a card
 * @param {object} props - The component props
 * @returns {JSX.Element} - The JSX element
 */
const CardBack = () => {
    return (
        <div
            data-testid="card-back"
            className={`${styles.Card} ${styles.CardOpponent} ${cardBackStyles.CardBackDefault}`}
        />
    );
};

export default CardBack;

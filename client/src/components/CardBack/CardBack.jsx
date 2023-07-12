import styles from '../Card/Card.module.css';
import cardBackStyles from './CardBack.module.css';

/**
 * Component representing the back side of a card
 * @param {object} props - The component props
 * @returns {JSX.Element} - The JSX element
 */
function CardBack({ index, cardsLength }) {
  return (
    <div
      data-testid="card-back"
      className={`${cardBackStyles.CardBackDefault} ${
        styles[`OpponentCardTotal-${cardsLength}`]
      } ${styles[`OpponentCardNumber-${cardsLength - index + 1}-of-${cardsLength}`]} w-[180px] h-[285px] z-0 rounded-xl`}
    />
  );
}

export default CardBack;

import styles from '../Card/Card.module.css';

/**
 * Component representing the back side of a card
 * @param {object} props - The component props
 * @returns {JSX.Element} - The JSX element
 */
function CardBack({ index, cardsLength }) {
  return (
    <div
      data-testid="card-back"
      className={`${
        styles[`OpponentCardTotal-${cardsLength}`]
      } ${styles[`OpponentCardNumber-${cardsLength - index + 1}-of-${cardsLength}`]} w-[180px] h-[285px] z-0 rounded-2xl bg-[image:var(--image-url)] bg-contain bg-center`}
      style={{ '--image-url': 'url(/cards/1.png)' }}
    />
  );
}

export default CardBack;

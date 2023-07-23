import styles from './Card.module.css';

/**
 * Card component represents a card with its properties.
 *
 * @param {Object} props - The component props.
 * @param {number} props.cardsLength - The total number of cards in the deck.
 * @param {number} props.index - The index of the card in the deck.
 * @param {boolean} props.canDrag - Flag indicating if the card is draggable.
 * @param {Object} props.card - The card object with properties like
 * name, mana, attack, defense, and portrait.
 * @returns {JSX.Element} The rendered Card component.
 */
function Card(props) {
  const {
    cardsLength, index, canDrag, card,
  } = props;
  const {
    name, mana, attack, defense, cardImage,
  } = card;

  return (
    <div
      data-testid="dragCard"
      className={`${styles.Card} ${styles.CardPlayer} ${canDrag ? styles.CardAbleToDrag : null} ${
        styles[`CardTotal-${cardsLength}`]
      } ${styles[`CardNumber-${index + 1}-of-${cardsLength}`]} relative w-[180px] h-[285px] z-0 transition-all`}
    >
      <img src={cardImage} alt={name} className="w-full h-full object-fill" />

      <div className="absolute w-[32px] h-[32px] rounded-[25px] top-[2.8%] left-[5.9%] flex items-center justify-center">
        <p className="text-[20px] font-bold text-blue-200">{mana || 0}</p>
      </div>

      <div className="absolute w-[32px] h-[32px] rounded-[25px] bottom-[50.2%] left-[5.9%] flex items-center justify-center">
        <p className="text-[20px] font-bold text-yellow-400">{attack || 0}</p>
      </div>
      <div className="absolute w-[32px] h-[32px] rounded-[25px] bottom-[50.2%] right-[5.2%] flex items-center justify-center">
        <p className="text-[20px] font-bold text-red-700">{defense || 0}</p>
      </div>

    </div>
  );
}

export default Card;

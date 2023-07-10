import CardBack from '../CardBack/CardBack';

/**
 * Component for rendering the opponent's hand of cards.
 * @param {Object} props - Component props.
 * @param {number} props.handCount - Number of cards in the opponent's hand.
 * @returns {JSX.Element} OpponentHand component.
 */
function OpponentHand(props) {
  const { handCount } = props;

  return (
    <div className="flex flex-row justify-center items-center">
      {Array(handCount)
        .fill(0)
        .map((_, i) => (
          <CardBack key={i} index={i} />
        ))}
    </div>
  );
}

export default OpponentHand;

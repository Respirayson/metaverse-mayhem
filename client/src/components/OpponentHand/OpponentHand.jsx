import CardBack from "../CardBack/CardBack";
import { Tooltip } from "react-tooltip";

/**
 * Component for rendering the opponent's hand of cards.
 * @param {Object} props - Component props.
 * @param {number} props.handCount - Number of cards in the opponent's hand.
 * @returns {JSX.Element} OpponentHand component.
 */
function OpponentHand(props) {
  const { handCount } = props;

  return (
    <>
      <div
        id="opponentHand"
        className="relative z-50 flex flex-row justify-center items-center scale-[0.65]"
      >
        {Array(handCount)
          .fill(0)
          .map((_, i) => (
            <CardBack key={i} index={i} cardsLength={handCount} />
          ))}
      </div>
      <Tooltip anchorSelect="#opponentHand" place="bottom">
        <p className="font-medium">
          <span className="font-extrabold text-white">Hand Count:</span>{" "}
          {handCount}
        </p>
      </Tooltip>
    </>
  );
}

export default OpponentHand;

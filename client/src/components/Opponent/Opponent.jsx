import styles from './Opponent.module.css';
import { TargetableHero } from '../../containers';
import OpponentHand from '../OpponentHand/OpponentHand';

/**
 * Component for rendering the opponent's side of the game board.
 * @param {Object} props - Component props.
 * @param {string} props.name - Opponent's name.
 * @param {number} props.handCount - Number of cards in the opponent's hand.
 * @param {Object} props.character - Opponent's character data.
 * @param {Object[]} props.board - Array of minion cards on the opponent's board.
 * @param {string[]} props.exhaustedMinions - Array of IDs of exhausted minions.
 * @param {Function} props.drawCard - Function to handle drawing a card from the opponent's deck.
 * @param {Function} props.hitFace - Function to handle attacking the opponent's face.
 * @param {Function} props.attackMinion - Function to handle attacking a minion on the opponent's board.
 * @param {boolean} props.turn - Flag indicating if it's the opponent's turn.
 * @returns {JSX.Element} Opponent component.
 */
function Opponent({
  name,
  handCount,
  character,
  hitFace,
  minions,
}) {
  return (
    <div className="relative w-full h-full pt-16">
      <TargetableHero character={character} hitFace={hitFace} name={name} isOpponent />
      <div className="absolute top-[40%] right-0 scale-[60%]">
        <OpponentHand handCount={handCount} />
      </div>
      <div className="flex flex-row items-center justify-center w-full h-[180px] mt-36">
        {minions}
      </div>
    </div>
  );
}

export default Opponent;

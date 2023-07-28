import { TargetableHero } from '../../containers';
import OpponentHand from '../OpponentHand/OpponentHand';

/**
 * Component for rendering the opponent's side of the game board.
 *
 * @param {Object} props - Component props.
 * @param {string} props.name - Opponent's name.
 * @param {number} props.handCount - Number of cards in the opponent's hand.
 * @param {Object} props.character - Opponent's character data.
 * @param {number} props.character.health - The current health of the opponent's character.
 * @param {Object} props.character.mana - The mana information of the opponent's character.
 * @param {number} props.character.mana.current - The current mana of the opponent's character.
 * @param {number} props.character.mana.total - The total mana of the opponent's character.
 * @param {Function} props.hitFace - Function to handle attacking the opponent's face.
 * @param {Object[]} props.minions - Array of minion cards on the opponent's board.
 * @param {React.Ref} props.heroRef - React ref for the opponent's character.
 * @param {Function} props.getCoords - Function to get the coordinates of the opponent's character.
 * @returns {JSX.Element} Opponent component.
 */
function Opponent({
  name,
  handCount,
  character,
  hitFace,
  minions,
  heroRef,
  getCoords,
}) {
  return (
    <>
      <div className="absolute top-0 right-[12%]">
        <OpponentHand handCount={handCount} />
      </div>
      <div className="relative w-full h-full pt-4">
        <TargetableHero
          heroRef={heroRef}
          character={character}
          hitFace={hitFace}
          name={name}
          isOpponent
          getCoords={getCoords}
        />
        <div className="flex flex-row items-center justify-center w-full h-[170px] mt-5">
          {minions}
        </div>
      </div>
    </>
  );
}

export default Opponent;

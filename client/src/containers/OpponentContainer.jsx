import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import allActions from '../actions';
import { Opponent } from '../components';
import EnemyMinion from './EnemyMinion';
import { slideAnimation } from '../utils/motion';
import { TradingCardMinterContext } from '../context/TradingCardMinter';
import { getCoords } from '../utils/animations';

/**
 * Container component for the opponent.
 * @param {Object} props - Component props.
 * @param {string} props.name - The name of the opponent.
 * @param {number} props.handCount - The number of cards in the opponent's hand.
 * @param {Object} props.character - The character of the opponent.
 * @param {boolean} props.turn - Indicates if it's the opponent's turn.
 * @returns {JSX.Element} OpponentContainer component.
 */
function OpponentContainer(props) {
  const dispatch = useDispatch();
  const { player1Ref } = useContext(TradingCardMinterContext);

  const {
    name, handCount, character, turn,
  } = props;
  const { board, exhaustedMinions } = props.board;

  /**
     * Function to hit the opponent's face with a minion.
     * @param {Object} minion - The attacking minion.
     * @param {Object} target - The target (opponent's face).
     */
  const hitFace = (minion, target) => {
    dispatch(allActions.playerActions.attackHero(minion, target));
  };

  /**
     * Function to attack an opponent's minion with a minion.
     * @param {number} attack - The attack value of the attacking minion.
     * @param {number} counterAttack - The counter-attack value of the target minion.
     * @param {Object} target - The target minion.
     * @param {Object} source - The attacking minion.
     */
  const attackMinion = (attack, counterAttack, target, source) => {
    dispatch(
      allActions.playerActions.attackMinion(
        attack,
        counterAttack,
        target,
        source,
      ),
    );
  };

  const minions = board.map((card, index) => (
    <motion.div key={card.key} {...slideAnimation('down')}>
      <EnemyMinion
        key={index}
        card={card}
        attackMinion={attackMinion}
        exhaustedMinions={exhaustedMinions}
        turn={turn}
      />
    </motion.div>
  ));

  return (
    <Opponent
      name={name}
      handCount={handCount}
      character={character}
      board={board}
      exhaustedMinions={exhaustedMinions}
      hitFace={hitFace}
      attackMinion={attackMinion}
      turn={turn}
      minions={minions}
      heroRef={player1Ref}
      getCoords={getCoords}
    />
  );
}

export default OpponentContainer;

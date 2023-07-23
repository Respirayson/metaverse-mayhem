import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import allActions from '../actions';
import { Player } from '../components';
import { TradingCardMinterContext } from '../context/TradingCardMinter';
import { getPlayerCoords } from '../utils/animations';

/**
 * Container component for the player.
 * @param {Object} props - Component props.
 * @param {string} props.name - The name of the player.
 * @param {Object} props.board - The player's board.
 * @param {Object} props.character - The player's character.
 * @param {boolean} props.playerTurn - Indicates if it's the player's turn.
 * @param {function} props.onClick - Function to handle click event.
 * @param {boolean} props.turn - Indicates if it's currently the turn of the player.
 * @returns {JSX.Element} PlayerContainer component.
 */
function PlayerContainer({
  name,
  board,
  character,
  playerTurn,
  onClick,
  turn,
}) {
  const dispatch = useDispatch();
  const { player2Ref } = useContext(TradingCardMinterContext);
  /**
     * Function to draw a card for the player.
     */
  const drawCard = () => {
    dispatch(allActions.playerActions.drawCard('PLAYER'));
  };

  return (
    <Player
      name={name}
      board={board}
      character={character}
      playerTurn={playerTurn}
      onClick={onClick}
      turn={turn}
      drawCard={drawCard}
      heroRef={player2Ref}
      getCoords={getPlayerCoords}
    />
  );
}

export default PlayerContainer;

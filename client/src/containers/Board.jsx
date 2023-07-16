import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import allActions from '../actions';
import PlayerContainer from './PlayerContainer';
import OpponentContainer from './OpponentContainer';
import CustomDragLayer from './CustomDragLayer';
import { GameInstruction } from '../components';

/**
 * Component representing the game board
 * @returns {JSX.Element} - The JSX element
 */
function Board() {
  // Get state values using useSelector hook
  const {
    user, board, opponent, handCount, character, turn, current
  } = useSelector(
    (state) => state,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (character.Player.health <= 0) {
      dispatch(allActions.gameActions.endGame(false));
    }

    if (character.Enemy.health <= 0) {
      dispatch(allActions.gameActions.endGame(true));
    }

  }, [character, navigate]);

  /**
     * Ends the turn by dispatching the endTurn action
     */
  const endTurn = () => {
    dispatch(allActions.gameActions.endTurn());
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <div className="w-full">
        <OpponentContainer
          board={board.Opponent}
          name={opponent}
          handCount={handCount}
          character={character.Enemy}
          turn={!turn}
        />
        <PlayerContainer
          name={user}
          board={board.Player}
          character={character.Player}
          playerTurn={turn}
          onClick={endTurn}
          turn={turn}
        />
      </div>
      <GameInstruction />
    </DndProvider>
  );
}

export default Board;

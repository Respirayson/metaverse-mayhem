import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
    user, board, opponent, handCount, character, turn,
  } = useSelector(
    (state) => state,
  );
  console.log(turn);
  const dispatch = useDispatch();

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

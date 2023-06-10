import { Player, Opponent } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import allActions from '../actions'

const Board = () => {
  const { user, board, opponent, handCount, character, turn } = useSelector(state => state)
  
  const dispatch = useDispatch();

  const endTurn = (source) => {
    dispatch(allActions.gameActions.endTurn(source));
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='w-full mt-24'>
          <Opponent board={board.Opponent} name={opponent} handCount={handCount} character={character.Enemy} opponentsTurn={!turn} />
          <Player name={user} board={board.Player} character={character.Player} playerTurn={turn} />
      </div>
      <button onClick={() => endTurn("PLAYER")} disabled={!turn}>End turn (yours)</button>
      <button onClick={() => endTurn("OPPONENT")} disabled={turn}>End turn (enemy)</button>
    </DndProvider>
  )
}


export default Board
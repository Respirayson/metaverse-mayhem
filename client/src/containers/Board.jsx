import { Player, Opponent } from '../components'
import { useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Board = () => {
  const { user, board, opponent, handCount, character } = useSelector(state => state)
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='w-full mt-24'>
          <Opponent board={board.Opponent} name={opponent} handCount={handCount} character={character.Enemy} />
          <Player name={user} board={board.Player} character={character.Player} />
      </div>
    </DndProvider>
  )
}


export default Board
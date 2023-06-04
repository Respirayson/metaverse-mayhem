import { Player, Opponent } from '../components'
import { useSelector } from 'react-redux'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Board = () => {

  const { user, board, opponent, handCount } = useSelector(state => state)
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='w-full mt-24'>
          <Opponent board={board.board} name={opponent} handCount={handCount} />
          <Player name={user} board={board} />
      </div>
    </DndProvider>
  )
}


export default Board
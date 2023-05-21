import { Player, Opponent } from '../components'
import { useSelector } from 'react-redux'

const Board = () => {

  const { user, board, opponent, handCount } = useSelector(state => state)
  // console.log(user)
  console.log(opponent)
  console.log(board)
  
  return (
    <div className='w-full mt-24'>
      <Opponent name={opponent} handCount={handCount} />
      <Player name={user} board={board} />
    </div>
  )
}


export default Board
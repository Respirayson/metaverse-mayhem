import React from 'react'
import { Player } from '../components'
import { useSelector } from 'react-redux'

const Board = () => {

  const { user, board } = useSelector(state => state)
  // console.log(user)
  // console.log(opponent)
  console.log(board)
  
  return (
    <div className='w-full'>
      <Player name={user} board={board} />
    </div>
  )
}


export default Board
import React from 'react'
import { Link } from 'react-router-dom'

const StartScreen = () => {
  return (
    <div className='text-white'>
        <h1>Welcome to Metaverse Mayhem</h1>
        <button>
            <Link to="/game/new">Start Game</Link>
        </button>
    </div>
  )
}

export default StartScreen
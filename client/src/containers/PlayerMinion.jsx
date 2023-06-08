import React from 'react'
import { Minion } from '../components'
import { useDrag } from 'react-dnd'
import itemTypes from '../constants'

const PlayerMinion = ({ card }) => {

    const [, drag] = useDrag(() => ({
      type: itemTypes.MINION,
      item: { attack: card.attack },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }))



    return (
        <div ref={drag} className='cursor-pointer relative'>
            <Minion card={card} />
        </div>
    )
}

export default PlayerMinion
import React from 'react'
import { Minion } from '../components'
import { useDrag } from 'react-dnd'
import itemTypes from '../constants'

const PlayerMinion = ({ card, exhausted }) => {

    const [, drag] = useDrag(() => ({
      canDrag: (monitor) => {
        return !exhausted;
      },
      type: itemTypes.MINION,
      item: { card },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }), [card, exhausted])



    return (
        <div ref={drag} className='cursor-pointer relative'>
            <Minion card={card} exhausted={exhausted} />
        </div>
    )
}

export default PlayerMinion
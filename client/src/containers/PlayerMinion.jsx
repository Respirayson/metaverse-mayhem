import React from 'react'
import { Minion } from '../components'
import { useDrag } from 'react-dnd'
import itemTypes from '../constants'

const PlayerMinion = ({ card, exhausted, canDrag }) => {

    const [, drag] = useDrag(() => ({
      canDrag: (monitor) => {
        if (exhausted) {
          return false
        }
        return canDrag

      },
      type: itemTypes.MINION,
      item: { card },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }), [card, exhausted, canDrag])



    return (
        <div ref={drag} className='cursor-pointer relative'>
            <Minion card={card} exhausted={exhausted} />
        </div>
    )
}

export default PlayerMinion
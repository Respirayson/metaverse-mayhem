import React from 'react'
import { Minion } from '../components'
import { useDrop } from 'react-dnd'
import itemTypes from '../constants'

const EnemyMinion = ({ card }) => {
    const [, drop] = useDrop(() => ({
        accept: itemTypes.MINION,
        drop: (item, monitor) => {
            console.log(card);
        },
        
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop}>
            <Minion card={card} />
        </div>
    )
}

export default EnemyMinion
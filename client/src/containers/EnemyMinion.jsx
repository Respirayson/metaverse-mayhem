import React from 'react'
import { Minion } from '../components'
import { useDrop } from 'react-dnd'
import itemTypes from '../constants'

const EnemyMinion = ({ card, attackMinion }) => {


    const [, drop] = useDrop(() => ({
        accept: itemTypes.MINION,
        drop: (item, monitor) => {
            // console.log(card)
            const { attack } = item.card;

            attackMinion(attack, card.attack, card, item.card);

        },
        
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [card]);

    return (
        <div ref={drop}>
            <Minion card={card} />
        </div>
    )
}

export default EnemyMinion
import React from 'react'
import { Minion } from '../components'
import { useDrop } from 'react-dnd'
import itemTypes from '../constants'

const EnemyMinion = ({ card, killMinion, hitMinion }) => {


    const [, drop] = useDrop(() => ({
        accept: itemTypes.MINION,
        drop: (item, monitor) => {
            // console.log(card)
            const { attack, defense, id } = item.card;
            const enemyKey = card.key;

            if (attack >= card.defense) {
                killMinion(enemyKey, "PLAYER");
            }

            if (card.attack >= defense) {
                killMinion(id, "OPPONENT")
            }

            hitMinion(attack, card.attack, card, item.card);

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
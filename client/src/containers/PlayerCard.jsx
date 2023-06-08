import React from 'react'
import { Card } from '../components'
import { useDrag } from 'react-dnd'
import itemTypes from '../constants'

const PlayerCard = (props) => {

    const { card, index, cardsLength } = props;

    const [, drag] = useDrag(() => ({
        type: itemTypes.CARD,
        item: { card: props.card, index: props.index, playCard: props.onCardClick },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
    }))

    return (
        <div ref={drag} className='pt-[120px]'>
            <Card card={card} cardsLength={cardsLength} index={index} />
        </div>
    )
}

export default PlayerCard
/* eslint-disable react/prop-types */
import React from 'react'
import { Hero } from '../components'
import { useDrop } from 'react-dnd'
import itemTypes from '../constants'

const TargetableHero = (props) => {

    const [, drop] = useDrop(() => ({
        accept: itemTypes.MINION,
        drop: (item, monitor) => {
            props.hitFace(item.card.attack, "OPPONENT");
        },
        
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [props]);


    return (
        <div ref={drop} className='flex h-16'>
            <Hero character={props.character} />
        </div>
    )
}

export default TargetableHero
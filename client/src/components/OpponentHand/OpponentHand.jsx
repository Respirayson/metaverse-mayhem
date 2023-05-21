/* eslint-disable react/prop-types */
import React from 'react'
import styles from "../Card/Card.module.css"
import CardBack from '../CardBack/CardBack';

const OpponentHand = (props) => {

    const { handCount } = props;
    

    return (
        <div className="flex flex-row justify-center h-96">
            { Array(handCount).fill(0).map((_, i) => (
                <CardBack key={i} />
            ))}
        </div>
    )
}

export default OpponentHand
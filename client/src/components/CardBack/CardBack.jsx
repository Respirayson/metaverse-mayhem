import React from 'react'
import styles from '../Card/Card.module.css'
import cardBackStyles from './CardBack.module.css'

const CardBack = (props) => {

    const { cardsLength, index } = props;

    return (
        <div className={`${styles.Card} ${styles.CardOpponent} ${cardBackStyles.CardBackDefault}`} />
    )
}

export default CardBack
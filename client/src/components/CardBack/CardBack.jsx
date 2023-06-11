import React from 'react'
import styles from '../Card/Card.module.css'
import cardBackStyles from './CardBack.module.css'

const CardBack = (props) => {

    return (
        <div data-testid='card-back' className={`${styles.Card} ${styles.CardOpponent} ${cardBackStyles.CardBackDefault}`} />
    )
}

export default CardBack
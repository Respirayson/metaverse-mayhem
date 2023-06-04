import React from 'react'
import styles from '../Card/Card.module.css'
import cardBackStyles from './CardBack.module.css'

const CardBack = () => {

    return (
        <div className={`${styles.Card} ${styles.CardOpponent} ${cardBackStyles.CardBackDefault} mx-1`} />
    )
}

export default CardBack
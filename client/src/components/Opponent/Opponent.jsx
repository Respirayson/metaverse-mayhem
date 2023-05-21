/* eslint-disable react/prop-types */
import React from 'react'
import styles from './Opponent.module.css'
import OpponentHand from '../OpponentHand/OpponentHand'

const Opponent = (props) => {

  const { name, handCount } = props;

  return (
    <div className={styles.Opponent}>
        <div className={styles.OpponentHandWrapper}>
          <h1 className={styles.OpponentName}>
            { name || 'Unnamed' }
          </h1>
          <OpponentHand handCount={handCount} />
        </div>
      </div>
  )
}

export default Opponent
/* eslint-disable react/prop-types */
import React from 'react'
import styles from './Opponent.module.css'
import OpponentHand from '../OpponentHand/OpponentHand'
import Minion from '../Minion/Minion'

const Opponent = (props) => {

  const { name, handCount, board } = props;

  const minions = board.map((card, index) => (
    <Minion key={index} card={card} />
  ));


  return (
    <div className={styles.Opponent}>
      <h1 className={styles.OpponentName}>
          { name || 'Unnamed' }
        </h1>
        <div className={styles.OpponentHandWrapper}>
          <OpponentHand handCount={handCount} />
        </div>
        <div className='flex flex-row items-center justify-center w-full h-[180px]'>
            { minions }
        </div>
      </div>
  )
}

export default Opponent
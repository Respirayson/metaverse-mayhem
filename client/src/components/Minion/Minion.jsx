/* eslint-disable react/prop-types */
import React from 'react'
import styles from './Minion.module.css'

const Minion = (props) => {

  const { card, exhausted } = props;
  const { attack, defense, portrait } = card;
  
  return (
    <div 
      className={`${styles.Minion} bg-[image:var(--image-url)] ${exhausted ? styles.MinionSleeping : styles.MinionAwake}`} 
      style={{'--image-url': `url(${portrait})`}}>
        <div className={`${styles.MinionAttack} text-[2.5vh]`}>{ attack }</div>
        <div className={`${styles.MinionDefense} text-[2.5vh]`}>{ defense }</div>
    </div>
  )
}

export default Minion;
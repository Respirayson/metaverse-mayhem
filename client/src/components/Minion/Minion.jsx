/* eslint-disable react/prop-types */
import React from 'react'
import styles from './Minion.module.css'




const Minion = (props) => {

    const { attack, defense, portrait } = props.card;

    return (
      <div className={`${styles.Minion} bg-[image:var(--image-url)]`} style={{'--image-url': `url(${portrait})`}}>
          <div className={styles.MinionAttack}>{ attack }</div>
          <div className={styles.MinionDefense}>{ defense }</div>
      </div>
    )
}

export default Minion
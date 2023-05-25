/* eslint-disable react/prop-types */
import React from 'react'
import styles from './Minion.module.css'

const Minion = (props) => {

    const { mana, attack, defense, name } = props.card;

    return (
        <div className={styles.Minion}>
          <p>Name: { name }</p>
          <p>Mana: { mana }</p>
          <p>Attack: { attack }</p>
          <p>Defense: { defense }</p>
      </div>
    )
}

export default Minion
/* eslint-disable react/prop-types */
import React from 'react'
import { PropTypes } from 'prop-types'
import styles from "./Player.module.css"
import { Hand } from "../../components"

const Player = (props) => {

    const { name } = props;

    return (
      <div className={styles.Player}>
          <div className={styles.PlayerHandWrapper}>
            <h1 className={`${styles.PlayerName}`}>{ name || 'Unnamed' }</h1>
            <Hand />
          </div>
      </div>
    )
}

Player.propTypes = {
    name: PropTypes.string,
    hand: PropTypes.array,
    deck: PropTypes.array,
}

export default Player
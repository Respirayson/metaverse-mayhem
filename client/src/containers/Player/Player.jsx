/* eslint-disable react/prop-types */
import React from 'react'
import { PropTypes } from 'prop-types'
import styles from "./Player.module.css"
import { Hand } from "../../components"
import allActions from '../../actions'
import { useDispatch } from 'react-redux'

const Player = (props) => {

    const { name } = props;

    const dispatch = useDispatch();

    const drawCard = () => {
      dispatch(allActions.userActions.drawCard());
    }

    return (
      <div className={styles.Player}>
          <div className={styles.PlayerHandWrapper}>
            <h1 onClick={drawCard} className={`${styles.PlayerName}`}>{ name || 'Unnamed' }</h1>
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
/* eslint-disable react/prop-types */
import styles from "./Player.module.css"
import { Hand, PlayingArea } from "../../components"
import allActions from '../../actions'
import { useDispatch } from 'react-redux'

const Player = (props) => {

    const { name, board } = props;
    // console.log(board)

    const dispatch = useDispatch();

    const drawCard = () => {
      dispatch(allActions.playerActions.drawCard());
    }

    return (
      <div className={styles.Player}>
          <div className={styles.PlayerHandWrapper}>
            <h1 onClick={drawCard} className={`${styles.PlayerName}`}>{ name || 'Unnamed' }</h1>
            <PlayingArea board={board.board} />
            <Hand />
          </div>
      </div>
    )
}

export default Player
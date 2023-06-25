/* eslint-disable react/prop-types */
import styles from "./Player.module.css"
import { Hand, PlayingArea } from "../../components"
import allActions from '../../actions'
import { useDispatch } from 'react-redux'
import { TargetableHero } from "../../containers"

const Player = (props) => {

    const { name, board, character, playerTurn } = props;

    const dispatch = useDispatch();

    const drawCard = () => {
      dispatch(allActions.playerActions.drawCard("PLAYER"));
    }

    return (
      <div className={styles.Player}>
          <div className={`${styles.PlayerHandWrapper}`}>
            <h1 onClick={drawCard} className={`${styles.PlayerName}`}>
              { name || 'Unnamed' }
              <TargetableHero character={character} />
            </h1>
            <PlayingArea playerTurn={playerTurn} board={board.board} exhaustedMinions={board.exhaustedMinions} />
            <Hand currentMana={character.mana.current} playerTurn={playerTurn} />
          </div>
      </div>
    )
}

export default Player
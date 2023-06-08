/* eslint-disable react/prop-types */
import React from 'react'
import styles from './Opponent.module.css'
import { EnemyMinion, TargetableHero } from '../../containers'
import OpponentHand from '../OpponentHand/OpponentHand'
import { useDispatch } from 'react-redux'
import allActions from '../../actions'
import { newRandomCard } from '../../utils/cards'
import { v4 as uuidv4 } from 'uuid'

const Opponent = (props) => {

  const dispatch = useDispatch();

  const { name, handCount, character } = props;
  const { board } = props.board;
  
  React.useEffect(() => {
    dispatch(allActions.playerActions.playCard({...newRandomCard(), key: uuidv4()}, 0, "OPPONENT"));
    dispatch(allActions.playerActions.playCard({...newRandomCard(), key: uuidv4()}, 0, "OPPONENT"));
  }, [dispatch]);

  

  const hitFace = (damage, target) => {
    dispatch(allActions.playerActions.hitFace(damage, target));
  }

  const minions = board.map((card, index) => (
    <EnemyMinion key={index} card={card} />
  ));


  return (
    <div className={styles.Opponent}>
      <h1 className={styles.OpponentName}>
          { name || 'Unnamed' }
          <TargetableHero character={character} hitFace={hitFace} />
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
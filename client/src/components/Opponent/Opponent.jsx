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
  
  const drawCard = () => {
    dispatch(allActions.playerActions.playCard({...newRandomCard(), key: uuidv4()}, 0, "OPPONENT"));
  }

  const hitFace = (damage, target) => {
    dispatch(allActions.playerActions.hitFace(damage, target));
  }

  const attackMinion = (attack, counterAttack, target, source) => {
    dispatch(allActions.playerActions.attackMinion(attack, counterAttack, target, source));
  }

  const minions = board.map((card, index) => (
    <EnemyMinion key={index} card={card} attackMinion={attackMinion} />
  ));


  return (
    <div className={styles.Opponent}>
      <h1 className={styles.OpponentName} onClick={drawCard}>
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
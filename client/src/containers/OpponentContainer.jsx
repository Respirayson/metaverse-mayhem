import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import allActions from '../actions';
import { newRandomCard } from '../utils/cards';
import { v4 as uuidv4 } from 'uuid';
import { Opponent } from '../components';

const OpponentContainer = (props) => {
  const dispatch = useDispatch();
  const opponent = useSelector((state) => state.opponent);
  
  const { name, handCount, character } = props;
  const { board, exhaustedMinions } = props.board;

  const drawCard = () => {
    dispatch(allActions.playerActions.playCard({...newRandomCard(), key: uuidv4()}, 0, "OPPONENT"));
  };

  const hitFace = (minion, target) => {
    dispatch(allActions.playerActions.attackHero(minion, target));
  };

  const attackMinion = (attack, counterAttack, target, source) => {
    dispatch(allActions.playerActions.attackMinion(attack, counterAttack, target, source));
  };

  return (
    <Opponent
      name={name}
      handCount={handCount}
      character={character}
      board={board}
      exhaustedMinions={exhaustedMinions}
      drawCard={drawCard}
      hitFace={hitFace}
      attackMinion={attackMinion}
    />
  );
};

export default OpponentContainer;

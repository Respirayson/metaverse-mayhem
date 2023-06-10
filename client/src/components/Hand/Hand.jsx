/* eslint-disable react/prop-types */
import { PlayerCard } from '../../containers';
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../actions';
import { v4 as uuidv4 } from 'uuid';

const Hand = ({ playerTurn }) => {

  const cards = useSelector((state) => state.hand.cards);
  
  const dispatch = useDispatch();

  const playCard = (card, index) => {
    dispatch(allActions.playerActions.playCard(card, index, "PLAYER"));
  }

  const cardsList = cards.map((card, index) => (
    <PlayerCard canDrag={playerTurn} card={card} key={uuidv4()} onCardClick={playCard} cardsLength={cards.length} index={index} />
  ))

  return (
    <div className="flex flex-row justify-center items-center h-[260px]">
      { cardsList }
    </div>
  )
}

export default Hand;
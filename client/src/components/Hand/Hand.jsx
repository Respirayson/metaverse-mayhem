/* eslint-disable react/prop-types */
import { Card } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../actions';
import { v4 as uuidv4 } from 'uuid';

const Hand = () => {

    const dispatch = useDispatch();

    const cards = useSelector((state) => state.hand.cards);

    const playCard = (card, index) => {
      dispatch(allActions.playerActions.playCard(card, index));
    }

    const cardsList = cards.map((card) => (
      <Card card={card} key={uuidv4()} onCardClick={playCard} />
    ))

    return (
      <div className="flex flex-row justify-center items-center mx-auto">
        { cardsList }
      </div>
    )
}

export default Hand;
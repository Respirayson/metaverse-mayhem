/* eslint-disable react/prop-types */
import { Card } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../actions';

const Hand = () => {

    const dispatch = useDispatch();

    const cards = useSelector((state) => state.hand.cards);

    const playCard = (card, index) => {
      dispatch(allActions.playerActions.playCard(card, index));
    }

    const cardsList = cards.map((card) => (
      <Card card={card} key={card.id} onCardClick={playCard} />
    ))

    return (
      <div className="flex flex-row justify-center h-18">
        { cardsList }
      </div>
    )
}

export default Hand;
/* eslint-disable react/prop-types */
import Card from '../Card/Card'
import { useDispatch, useSelector } from 'react-redux'
import allActions from '../../actions';

const Hand = () => {

    const dispatch = useDispatch();

    const cards = useSelector((state) => state.hand.cards);

    const playCard = (card, index) => {
      dispatch(allActions.userActions.playCard(card, index));
    }

    return (
      <div className="flex flex-row justify-center h-96">
        { cards.map((card, index) => (
          <Card card={card} key={card.id} index={index} onCardClick={playCard} />
        )) }
      </div>
    )
}

export default Hand;
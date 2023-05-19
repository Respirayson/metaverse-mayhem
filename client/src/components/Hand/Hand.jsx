/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { PropTypes } from 'prop-types'
import Card from '../Card/Card'
import { useDispatch, useSelector } from 'react-redux'

const Hand = () => {

    const cards = useSelector((state) => state.cards); 
    const dispatch = useDispatch();

    const placeCard = (card, index) => {
      dispatch({ payload: {card, index}, type: 'PLACE_CARD' });
    }

    return (
      <div className="flex flex-row justify-center h-96">
      { cards.map((card, index) => (
        <Card {...card} key={card.id} index={index} onClick={placeCard} />
      )) }
      </div>
    )
}

Hand.propTypes = {
    cards: PropTypes.array,
    dispatch: PropTypes.func,
}

export default Hand;
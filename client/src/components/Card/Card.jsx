/* eslint-disable react/prop-types */
import React from 'react'
import styles from './Card.module.css'
import itemTypes from '../../constants'
import { useDrag } from 'react-dnd'

const Card = (props) => {
    
    // const playCard = () => {
    //   const { card, onCardClick } = props;
    //   onCardClick(card);
    // }  

    const [{ isDragging }, drag] = useDrag(() => ({
      type: itemTypes.CARD,
      item: { card: props.card, index: props.index, playCard: props.onCardClick },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }))

    const { cardsLength, index } = props;
    const { name, mana, attack, defense, portrait } = props.card;

    return (
        <div data-testid="dragCard" ref={drag} className={`${styles.Card} ${styles.CardPlayer} ${styles[`CardTotal-${cardsLength}`]} ${styles[`CardNumber-${index + 1}-of-${cardsLength}`]} `}>
          <div className={`${styles.CardPortrait} bg-[image:var(--image-url)]`} style={{'--image-url': `url(${portrait})`}}></div>
          <div className={styles.CardMana}>{ mana || 0 }</div>
          <h1 className={`${styles.CardName} font-medium`}>{ name }</h1>
          { attack ? <div className={styles.CardAttack}>{ attack }</div> : null }
          { defense ? <div className={styles.CardDefense}>{ defense }</div> : null }
        </div>
      );

    
}


export default Card
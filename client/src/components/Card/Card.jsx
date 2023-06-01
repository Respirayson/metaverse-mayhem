/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types'
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

    const { name, mana, attack, defense } = props.card;

    return (
      
        <div ref={drag} style={{opacity: isDragging ? 0.5 : 1}} className={`${styles.Card} ${styles.CardPlayer}`}>
          <div className={styles.CardMana}>{ mana || 0 }</div>
          <h1 className={`${styles.CardName} font-medium`}>{ name }</h1>
          { attack ? <div className={styles.CardAttack}>{ attack }</div> : null }
          { defense ? <div className={styles.CardDefense}>{ defense }</div> : null }
        </div>
      );

    
}


export default Card
/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types'
import styles from './Card.module.css'

const Card = (props) => {

    const playCard = () => {
      const { index, card, onCardClick } = props;
      onCardClick(card, index);
    }

    const { name, mana, attack, defense } = props.card;

    return (
        <div onClick={playCard} className={`${styles.Card} mt-48`}>
          <div className={styles.CardMana}>{ mana || 0 }</div>
          <h1 className={`${styles.CardName} font-medium`}>{ name }</h1>
          { attack ? <div className={styles.CardAttack}>{ attack }</div> : null }
          { defense ? <div className={styles.CardDefense}>{ defense }</div> : null }
        </div>
      );

    
}

Card.propTypes = {
    index: PropTypes.number.isRequired,
    onCardClick: PropTypes.func,
};


export default Card
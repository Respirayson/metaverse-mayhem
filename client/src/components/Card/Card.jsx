/* eslint-disable react/prop-types */
import { PropTypes } from 'prop-types'
import styles from './Card.module.css'

const Card = (props) => {

    const placeCard = () => {
      const { index, id, name, mana, attack, defense, onClick } = props;
      onClick({ id, name, mana, attack, defense }, index);
    }

    const { name, mana, attack, defense } = props;

    return (
        <div onClick={placeCard} className={`${styles.Card} mt-48`}>
          <div className={styles.CardMana}>{ mana || 0 }</div>
          <h1 className={`${styles.CardName} font-medium`}>{ name }</h1>
          { attack ? <div className={styles.CardAttack}>{ attack }</div> : null }
          { defense ? <div className={styles.CardDefense}>{ defense }</div> : null }
        </div>
      );

    
}

Card.propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    mana: PropTypes.number,
    attack: PropTypes.number,
    defense: PropTypes.number,
    onClick: PropTypes.func,
};


export default Card
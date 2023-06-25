import React from "react";
import styles from "./Card.module.css";

/**
 * Card component represents a card with its properties.
 *
 * @param {Object} props - The component props.
 * @param {number} props.cardsLength - The total number of cards in the deck.
 * @param {number} props.index - The index of the card in the deck.
 * @param {boolean} props.canDrag - Flag indicating if the card is draggable.
 * @param {Object} props.card - The card object with properties like name, mana, attack, defense, and portrait.
 * @returns {JSX.Element} The rendered Card component.
 */
const Card = (props) => {
    const { cardsLength, index, canDrag } = props;
    const { name, mana, attack, defense, portrait } = props.card;

    return (
        <div
            data-testid="dragCard"
            className={`${styles.Card} ${styles.CardPlayer} ${
                styles[`CardTotal-${cardsLength}`]
            } ${styles[`CardNumber-${index + 1}-of-${cardsLength}`]} 
      ${canDrag ? styles.CardAbleToDrag : null}`}
        >
            <div
                className={`${styles.CardPortrait} bg-[image:var(--image-url)]`}
                style={{ "--image-url": `url(${portrait})` }}
            ></div>
            <div className={styles.CardMana}>{mana || 0}</div>
            <h1 className={`${styles.CardName} font-medium`}>{name}</h1>
            {attack ? <div className={styles.CardAttack}>{attack}</div> : null}
            {defense ? (
                <div className={styles.CardDefense}>{defense}</div>
            ) : null}
        </div>
    );
};

export default Card;

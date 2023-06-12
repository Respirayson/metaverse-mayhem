import React from "react";
import { Card } from "../components";
import { useDrag } from "react-dnd";
import itemTypes from "../constants";

const PlayerCard = ({ card, index, cardsLength, canDrag, onCardClick, currentMana }) => {
  const [, drag] = useDrag(
    () => ({
      type: itemTypes.CARD,
      canDrag: canDrag && card.mana <= currentMana,
      item: { card: card, index: index, playCard: onCardClick },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [canDrag, card, currentMana]
  );

  return (
    <div ref={drag} className="pt-[120px]">
      <Card canDrag={canDrag && card.mana <= currentMana} card={card} cardsLength={cardsLength} index={index} />
    </div>
  );
};

export default PlayerCard;

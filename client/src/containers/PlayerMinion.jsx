import React from "react";
import { Minion } from "../components";
import { useDrag } from "react-dnd";
import itemTypes from "../constants";

/**
 * Component for a player's minion.
 * @param {Object} props - Component props.
 * @param {Object} props.card - The minion card.
 * @param {boolean} props.exhausted - Indicates if the minion is exhausted.
 * @param {boolean} props.canDrag - Indicates if the minion can be dragged.
 * @returns {JSX.Element} PlayerMinion component.
 */
const PlayerMinion = ({ card, exhausted, canDrag }) => {
    /**
     * Hook to enable dragging functionality for the minion.
     */
    const [, drag] = useDrag(
        () => ({
            canDrag: (monitor) => {
                if (exhausted) {
                    return false;
                }
                return canDrag;
            },
            type: itemTypes.MINION,
            item: { card },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }),
        [card, exhausted, canDrag]
    );

    return (
        <div ref={drag} className="cursor-pointer relative">
            <Minion card={card} exhausted={exhausted || !canDrag} />
        </div>
    );
};

export default PlayerMinion;

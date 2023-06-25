import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { PlayingArea } from "../components";
import PlayerMinion from "./PlayerMinion";
import itemTypes from "../constants";
import { slideAnimation } from "../utils/motion";

/**
 * Container component for the playing area.
 * @param {Object} props - Component props.
 * @param {Array} props.board - The player's board.
 * @param {Array} props.exhaustedMinions - The list of exhausted minions.
 * @param {boolean} props.playerTurn - Indicates if it's the player's turn.
 * @returns {JSX.Element} PlayingAreaContainer component.
 */
const PlayingAreaContainer = ({ board, exhaustedMinions, playerTurn }) => {
    const [boardLength, setBoardLength] = useState(0);

    /**
     * Hook to enable dropping functionality for cards onto the playing area.
     */
    const [{ isOver }, drop] = useDrop(
        () => ({
            accept: itemTypes.CARD,
            canDrop: (item, monitor) => {
                return boardLength < 7;
            },
            drop: (item, monitor) => {
                setBoardLength(boardLength + 1);
                const boundingClientRect = document
                    .querySelector('[data-testid="dropBoard"]')
                    .getBoundingClientRect();
                const boardMiddleX = boundingClientRect.width / 2;
                const mousePosition = monitor.getClientOffset();
                const cardMiddleX = mousePosition.x - boundingClientRect.left;

                if (cardMiddleX < boardMiddleX) {
                    item.playCard(item.card, 0);
                } else {
                    item.playCard(item.card, 1);
                }
            },

            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }),
        [boardLength]
    );

    const minions = board.map((card, i) => (
        <motion.div key={card.key} {...slideAnimation("up")}>
            <PlayerMinion
                canDrag={playerTurn}
                card={card}
                key={i}
                exhausted={exhaustedMinions.includes(card.key)}
            />
        </motion.div>
    ));

    return <PlayingArea dropRef={drop} minions={minions} isOver={isOver} />;
};

export default PlayingAreaContainer;

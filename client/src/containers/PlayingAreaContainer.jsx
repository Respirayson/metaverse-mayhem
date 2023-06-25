import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { PlayingArea } from "../components";
import PlayerMinion from "./PlayerMinion";
import itemTypes from "../constants";
import { slideAnimation } from "../utils/motion";

const PlayingAreaContainer = ({ board, exhaustedMinions, playerTurn }) => {
	const [boardLength, setBoardLength] = useState(0);
	const [cardLastPlayed, setCardLastPlayed] = useState();

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: itemTypes.CARD,
			canDrop: (item, monitor) => {
				return boardLength < 7;
			},
			drop: (item, monitor) => {
				setBoardLength(boardLength + 1);
				setCardLastPlayed(item.card);
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

	const minions = board.map((card, i) =>
		card ? (
			card === cardLastPlayed ? (
				<motion.div key={card.key} {...slideAnimation("up")}>
					<PlayerMinion
						canDrag={playerTurn}
						card={card}
						key={i}
						exhausted={exhaustedMinions.includes(card.key)}
					/>
				</motion.div>
			) : (
				<PlayerMinion
					canDrag={playerTurn}
					card={card}
					key={i}
					exhausted={exhaustedMinions.includes(card.key)}
				/>
			)
		) : (
			<div key={i} />
		)
	);

	return <PlayingArea dropRef={drop} minions={minions} isOver={isOver} />;
};

export default PlayingAreaContainer;

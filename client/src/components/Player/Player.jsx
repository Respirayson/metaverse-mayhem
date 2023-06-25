import React from "react";
import styles from "./Player.module.css";
import { PlayingArea } from "../../components";
import { TargetableHero, HandContainer, PlayingAreaContainer } from "../../containers";

const Player = ({
	name,
	board,
	character,
	playerTurn,
	onClick,
	turn,
	drawCard,
}) => {
	return (
		<div className={styles.Player}>
			<div className={`${styles.PlayerHandWrapper}`}>
				<h1 onClick={drawCard} className={`${styles.PlayerName}`}>
					{name || "Unnamed"}
					<TargetableHero character={character} />
				</h1>
				<button
					className={`absolute right-[60px] top-[640px] font-semibold ${
						turn ? "bg-green-700" : "bg-gray-700"
					} text-white p-2 rounded-full px-4`}
					onClick={onClick}
					disabled={!turn}
				>
					End Turn
				</button>
				<PlayingAreaContainer
					playerTurn={playerTurn}
					board={board.board}
					exhaustedMinions={board.exhaustedMinions}
				/>
				<HandContainer
					currentMana={character.mana.current}
					playerTurn={playerTurn}
				/>
			</div>
		</div>
	);
};

export default Player;

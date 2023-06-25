import React from "react";
import styles from "./Opponent.module.css";
import { EnemyMinion, TargetableHero } from "../../containers";
import OpponentHand from "../OpponentHand/OpponentHand";

const Opponent = ({
	name,
	handCount,
	character,
	board,
	exhaustedMinions,
	drawCard,
	hitFace,
	attackMinion,
}) => {
	const minions = board.map((card, index) => (
		<EnemyMinion
			key={index}
			card={card}
			attackMinion={attackMinion}
			exhaustedMinions={exhaustedMinions}
		/>
	));

	return (
		<div className={styles.Opponent}>
			<h1 className={styles.OpponentName} onClick={drawCard}>
				{name || "Unnamed"}
				<TargetableHero character={character} hitFace={hitFace} />
			</h1>
			<div className={styles.OpponentHandWrapper}>
				<OpponentHand handCount={handCount} />
			</div>
			<div className="flex flex-row items-center justify-center w-full h-[180px]">
				{minions}
			</div>
		</div>
	);
};

export default Opponent;

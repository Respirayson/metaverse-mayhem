import React from "react";
import styles from "./PlayingArea.module.css";

const PlayingArea = ({ dropRef, minions, isOver }) => {
	return (
		<div
			data-testid="dropBoard"
			ref={dropRef}
			className="flex flex-row items-center justify-center w-full h-[180px] relative z-10"
		>
			{minions}
			{isOver && <div className={styles.PlayingArea} />}
		</div>
	);
};

export default PlayingArea;

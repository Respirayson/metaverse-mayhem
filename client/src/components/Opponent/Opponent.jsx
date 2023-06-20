import React from "react";
import styles from "./Opponent.module.css";
import { EnemyMinion, TargetableHero } from "../../containers";
import OpponentHand from "../OpponentHand/OpponentHand";

/**
 * Component for rendering the opponent's side of the game board.
 * @param {Object} props - Component props.
 * @param {string} props.name - Opponent's name.
 * @param {number} props.handCount - Number of cards in the opponent's hand.
 * @param {Object} props.character - Opponent's character data.
 * @param {Object[]} props.board - Array of minion cards on the opponent's board.
 * @param {string[]} props.exhaustedMinions - Array of IDs of exhausted minions.
 * @param {Function} props.drawCard - Function to handle drawing a card from the opponent's deck.
 * @param {Function} props.hitFace - Function to handle attacking the opponent's face.
 * @param {Function} props.attackMinion - Function to handle attacking a minion on the opponent's board.
 * @param {boolean} props.turn - Flag indicating if it's the opponent's turn.
 * @returns {JSX.Element} Opponent component.
 */
const Opponent = ({
    name,
    handCount,
    character,
    board,
    exhaustedMinions,
    drawCard,
    hitFace,
    attackMinion,
    turn,
}) => {
    const minions = board.map((card, index) => (
        <EnemyMinion
            key={index}
            card={card}
            attackMinion={attackMinion}
            exhaustedMinions={exhaustedMinions}
            turn={turn}
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

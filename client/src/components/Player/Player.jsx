import styles from "./Player.module.css";
import {
    TargetableHero,
    HandContainer,
    PlayingAreaContainer,
} from "../../containers";

/**
 * Component for rendering the player's area including hand and playing area.
 * @param {Object} props - Component props.
 * @param {string} props.name - Player's name.
 * @param {Object[]} props.board - Player's board of cards.
 * @param {Object} props.character - Player's character.
 * @param {boolean} props.playerTurn - Indicates if it's the player's turn.
 * @param {function} props.onClick - Function to handle the click event.
 * @param {number} props.turn - Current turn number.
 * @param {function} props.drawCard - Function to draw a card.
 * @returns {JSX.Element} Player component.
 */
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
        <div className={styles.Player} data-testid="targetable-player-hero">
            <div className={`${styles.PlayerHandWrapper}`}>
                <h1 onClick={drawCard} className={`${styles.PlayerName}`}>
                    {name || "Unnamed"}
                    <TargetableHero character={character} />
                </h1>
                <button
                    className={`absolute right-[60px] top-[630px] font-semibold ${
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

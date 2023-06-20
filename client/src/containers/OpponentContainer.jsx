import React from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../actions";
import { newRandomCard } from "../utils/cards";
import { v4 as uuidv4 } from "uuid";
import { Opponent } from "../components";

/**
 * Container component for the opponent.
 * @param {Object} props - Component props.
 * @param {string} props.name - The name of the opponent.
 * @param {number} props.handCount - The number of cards in the opponent's hand.
 * @param {Object} props.character - The character of the opponent.
 * @param {boolean} props.turn - Indicates if it's the opponent's turn.
 * @returns {JSX.Element} OpponentContainer component.
 */
const OpponentContainer = (props) => {
    const dispatch = useDispatch();

    const { name, handCount, character, turn } = props;
    const { board, exhaustedMinions } = props.board;

    /**
     * Function to draw a card for the opponent.
     */
    const drawCard = () => {
        dispatch(
            allActions.playerActions.playCard(
                {
                    ...newRandomCard(),
                    key: uuidv4(),
                },
                0,
                "OPPONENT"
            )
        );
    };

    /**
     * Function to hit the opponent's face with a minion.
     * @param {Object} minion - The attacking minion.
     * @param {Object} target - The target (opponent's face).
     */
    const hitFace = (minion, target) => {
        dispatch(allActions.playerActions.attackHero(minion, target));
    };

    /**
     * Function to attack an opponent's minion with a minion.
     * @param {number} attack - The attack value of the attacking minion.
     * @param {number} counterAttack - The counter-attack value of the target minion.
     * @param {Object} target - The target minion.
     * @param {Object} source - The attacking minion.
     */
    const attackMinion = (attack, counterAttack, target, source) => {
        dispatch(
            allActions.playerActions.attackMinion(
                attack,
                counterAttack,
                target,
                source
            )
        );
    };

    return (
        <Opponent
            name={name}
            handCount={handCount}
            character={character}
            board={board}
            exhaustedMinions={exhaustedMinions}
            drawCard={drawCard}
            hitFace={hitFace}
            attackMinion={attackMinion}
            turn={turn}
        />
    );
};

export default OpponentContainer;

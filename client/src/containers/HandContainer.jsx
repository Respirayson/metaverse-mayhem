import React from "react";
import { useDispatch, useSelector } from "react-redux";
import allActions from "../actions";
import { Hand } from "../components";

/**
 * Container component for the player's hand.
 * @param {Object} props - Component props.
 * @param {boolean} props.playerTurn - Indicates if it's the player's turn.
 * @param {number} props.currentMana - The current mana of the player.
 * @returns {JSX.Element} HandContainer component.
 */
const HandContainer = ({ playerTurn, currentMana }) => {
    const cards = useSelector((state) => state.hand.cards);
    const dispatch = useDispatch();

    /**
     * Function to play a card from the hand.
     * @param {Object} card - The card object to be played.
     * @param {number} index - The index of the card in the hand.
     */
    const playCard = (card, index) => {
        dispatch(
            allActions.playerActions.spendManaAndPlayCard(card, index, "PLAYER")
        );
    };

    return (
        <Hand
            cards={cards}
            currentMana={currentMana}
            playerTurn={playerTurn}
            playCard={playCard}
        />
    );
};

export default HandContainer;

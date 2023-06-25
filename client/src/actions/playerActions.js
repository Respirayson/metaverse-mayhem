import gameActions from "./gameActions"

const playCard = (card, index, source) => {
    return { payload: { card, index, source }, type: 'PLAY_CARD' }
}

const spendManaAndPlayCard = (card, index, source) => {
    return (dispatch, getState) => {

        const player = source === "PLAYER" ? "Player" : "Opponent";

        const currentMana = getState().character[player].mana.current;

        if (currentMana < card.mana) {
            return;
        }

        dispatch(playCard(card, index, source));
        dispatch(gameActions.useMana(source, card.mana));
    }
}

const drawCard = (target) => {
    return { payload: { target }, type: 'DRAW_CARD'}
}

const hitFace = (card, target) => {
    return { payload: { card, target }, type: 'HIT_FACE'}
}

const hitMinion = (attack, target, source) => {
    return { payload: { attack, target, source }, type: 'HIT_MINION'}
}

const killMinion = (target, source) => {
    return { payload: { key: target, source }, type: 'KILL_MINION'}
}

const attackMinion = (attack, counterAttack, target, source) => {
    // console.log(attack, counterAttack, target, source)

    return dispatch => {
        dispatch(hitMinion(attack, target, "PLAYER"));
        dispatch(hitMinion(counterAttack, source, "OPPONENT"));

        if (attack >= target.defense) {
            dispatch(killMinion(target.key, "PLAYER"));
        }

        if (counterAttack >= source.defense) {
            dispatch(killMinion(source.key, "OPPONENT"));
        }

    }
}

export default {
    playCard,
    drawCard,
    hitFace,
    attackMinion,
    killMinion,
    hitMinion,
    spendManaAndPlayCard
}
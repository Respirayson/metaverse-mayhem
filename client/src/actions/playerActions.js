
const playCard = (card, index, source) => {
    return { payload: { card, index, source }, type: 'PLAY_CARD' }
}

const drawCard = () => {
    return { payload: {}, type: 'DRAW_CARD'}
}

const hitFace = (damage, target) => {
    return { payload: { damage, target }, type: 'HIT_FACE'}
}

const hitMinion = (attack, counterAttack, target, source) => {
    return { payload: { attack, counterAttack, target, source }, type: 'HIT_MINION'}
}

const killMinion = (target, source) => {
    return { payload: { key: target, source }, type: 'KILL_MINION'}
}

export default {
    playCard,
    drawCard,
    hitFace,
    hitMinion,
    killMinion
}
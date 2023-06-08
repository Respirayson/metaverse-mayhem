
const playCard = (card, index, source) => {
    return { payload: { card, index, source }, type: 'PLAY_CARD' }
}

const drawCard = () => {
    return { payload: {}, type: 'DRAW_CARD'}
}

const hitFace = (damage, target) => {
    return { payload: { damage, target }, type: 'HIT_FACE'}
}

const hitMinion = (damage, target) => {
    return { payload: { damage, target }, type: 'HIT_MINION'}
}

export default {
    playCard,
    drawCard,
    hitFace,
    hitMinion
}
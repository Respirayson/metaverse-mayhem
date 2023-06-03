
const playCard = (card, index) => {
    return { payload: { card, index }, type: 'PLAY_CARD' }
}

const drawCard = () => {
    return { payload: {}, type: 'DRAW_CARD'}
}

export default {
    playCard,
    drawCard
}
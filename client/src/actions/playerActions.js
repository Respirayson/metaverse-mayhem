
const playCard = (card, index) => {
    return { payload: { card }, type: 'PLAY_CARD' }
}

const drawCard = () => {
    return { payload: {}, type: 'DRAW_CARD'}
}

export default {
    playCard,
    drawCard
}
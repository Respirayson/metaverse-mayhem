/**
 * Socket middleware for emitting actions to the server
 * @param {object} socket - The socket object
 * @returns {Function} - The middleware function
 */
export const socketMiddleware = (socket) => (params) => (next) => (action) => {
    // Extract dispatch and getState from the parameters
    const { dispatch, getState } = params;

    // Get the gameId and hasOpponent from the current state
    const { gameId, hasOpponent } = getState().current;

    // Check if the action should be sent via the server
    if (!action.viaServer && gameId && hasOpponent) {
        // Emit the action to the socket
        socket.emit("action", { gameId, action });
    }

    // Pass the action to the next middleware or reducer
    return next(action);
};

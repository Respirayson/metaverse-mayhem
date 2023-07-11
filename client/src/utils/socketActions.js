import allActions from '../actions';

/**
 * Logs the specified name and data to the console
 * @param {string} name - The name to be logged
 * @returns {Function} - A function that logs the name and data when invoked
 */
const logAction = (name) => (data) => {
  console.log(name, data);
};

/**
 * Sets up socket event listeners and dispatches actions based on received events
 * @param {function} dispatch - The dispatch function from the Redux store
 * @param {object} socket - The socket object
 */
export const socketActions = (dispatch, socket) => {
  socket.on('connect', logAction('connect'));

  socket.on('disconnect', logAction('disconnect'));

  socket.on('action', (payload) => {
    const { action } = payload;
    console.log('Action has come through the socket ', action);

    dispatch({ viaServer: true, ...action });
  });

  socket.on('newGame', (payload) => {
    const { user, opponentName, isStarting } = payload;
    dispatch(
      allActions.gameActions.newGame(
        user,
        opponentName,
        isStarting,
        true,
      ),
    );
  });

  socket.on('playerJoined', (payload) => {
    const { playerCount } = payload;
    console.log('playerCount', playerCount);
  });
};

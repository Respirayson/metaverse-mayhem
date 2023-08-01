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
  // Event listener for 'connect' event
  socket.on('connect', logAction('connect'));

  // Event listener for 'disconnect' event
  socket.on('disconnect', logAction('disconnect'));

  // Event listener for 'action' event
  socket.on('action', (payload) => {
    const { action } = payload;
    console.log('Action has come through the socket ', action);

    // Dispatches the received action to the Redux store with 'viaServer' flag set to true
    dispatch({ viaServer: true, ...action });
  });

  // Event listener for 'newGame' event
  socket.on('newGame', (payload) => {
    const { user, opponentName, isStarting } = payload;
    // Dispatches the 'newGame' action with the received payload data
    dispatch(
      allActions.gameActions.newGame(
        user,
        opponentName,
        isStarting,
        true,
      ),
    );
  });

  // Event listener for 'playerJoined' event
  socket.on('playerJoined', (payload) => {
    const { playerCount } = payload;
    console.log('playerCount', playerCount);
  });

  // Event listener for 'playerLeft' event
  socket.on('playerLeft', (payload) => {
    const { playerCount } = payload;
    console.log('playerCount', playerCount);
    // Dispatches the 'endGame' action with 'isPlayerWinner' set to true
    dispatch(allActions.gameActions.endGame(true));
  });
};

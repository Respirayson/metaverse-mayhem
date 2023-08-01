import { io } from 'socket.io-client';

/**
 * The WebSocket connection to the server using Socket.IO library.
 * @type {SocketIO.Socket}
 */
export const socket = io('https://metaverse-mayhem.onrender.com');

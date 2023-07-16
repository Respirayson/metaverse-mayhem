import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

import connectDB from './mongodb/connect.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import marketplaceRoutes from './routes/marketplaceRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/game', gameRoutes);
app.use('/api/v1/marketplace', marketplaceRoutes);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

/**
 * GET route for checking server status
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
app.get('/', async (req, res) => {
  res.send(
    'Hello from Metaverse Mayhem. This is to check whether the server is running.',
  );
});

/**
 * Get the number of clients in a room
 * @param {Object} soc - Socket.IO server object
 * @param {string} name - Room name
 * @returns {number} - Number of clients in the room
 */
const sizeOfRoom = (soc, name) => {
  const room = soc.sockets.adapter.rooms.get(name);

  if (room) {
    return room.size;
  }

  return 0;
};

/**
 * Get an array of socket IDs in a room
 * @param {Object} soc - Socket.IO server object
 * @param {string} name - Room name
 * @returns {string[]} - Array of socket IDs in the room
 */
const getSocketsInRoom = (soc, name) => {
  const room = soc.sockets.adapter.rooms.get(name);

  if (room) {
    return Array.from(room);
  }

  return [];
};

/**
 * Check if a socket is in a room
 * @param {Object} soc - Socket.IO server object
 * @param {string} roomName - Room name
 * @param {string} clientId - Socket ID of the client
 * @returns {boolean} - True if the socket is in the room, false otherwise
 */
const isSocketInRoom = (soc, roomName, clientId) => {
  const clients = getSocketsInRoom(soc, roomName);

  return clients.indexOf(clientId) !== -1;
};

/**
 * Handle Socket.IO connections and events
 */
const connectSockets = () => {
  io.on('connection', (socket) => {
    /**
         * Handle joining a game
         * @param {Object} data - Data containing the gameId
         */
    socket.on('joinGame', async ({ gameId, name }) => {
      const getPlayerCount = () => sizeOfRoom(io, gameId);
      if (getPlayerCount() === 2) {
        return;
      }
      socket.data.username = name;
      await socket.join(gameId);

      io.in(gameId).emit('playerJoined', {
        playerCount: getPlayerCount(),
        name,
      });

      console.log(
        '[JOIN_GAME] Current players:',
        getSocketsInRoom(io, gameId),
      );

      if (getPlayerCount() === 2) {
        console.log(
          '[JOIN_GAME] [START] Time to start the game',
          gameId,
        );
        const playerOneStarts = Math.random() >= 0.5;
        const [playerOne, playerTwo] = getSocketsInRoom(io, gameId);
        const sockets = await io.in(gameId).fetchSockets();
        io.to(playerOne).emit('newGame', {
          user: sockets[1].data.username,
          gameId,
          opponentName: sockets[0].data.username,
          isStarting: playerOneStarts,
        });
        io.to(playerTwo).emit('newGame', {
          user: sockets[0].data.username,
          gameId,
          opponentName: sockets[1].data.username,
          isStarting: !playerOneStarts,
        });
      }
    });

    // TODO: implement leave socket logic
    /**
         * Handle leaving a game
         * @param {Object} data - Data containing the gameId
         */
    socket.on('leaveGame', ({ gameId }) => {
      io.in(gameId).emit('playerLeft', {
        playerCount: sizeOfRoom(io, gameId),
      });
    });

    /**
         * Handle disconnection of a client
         */
    socket.on('disconnect', () => {
      console.log('User Disconnected');
    });

    /**
         * Handle game actions
         * @param {Object} payload - Data containing the action and gameId
         */
    socket.on('action', (payload) => {
      const { action } = payload;
      const { gameId } = payload;
      console.log(payload);
      console.log('====================================');

      console.log(
        '[ACTION] current clients:',
        getSocketsInRoom(io, gameId),
      );
      console.log(
        '[ACTION] Current action from:',
        `Player${getSocketsInRoom(io, gameId).indexOf(socket.id) + 1}`,
      );

      // Validate if player is actually part of this game.
      if (!isSocketInRoom(io, gameId, socket.id)) {
        return;
      }

      let newAction = action;
      if (action.payload.target) {
        const newPayload = {
          ...action.payload,
          target:
                        action.payload.target === 'PLAYER'
                          ? 'OPPONENT'
                          : 'PLAYER',
        };

        newAction = { ...action, payload: newPayload };
      }

      if (action.payload.source) {
        const newPayload = {
          ...newAction.payload,
          source:
                        action.payload.source === 'PLAYER'
                          ? 'OPPONENT'
                          : 'PLAYER',
        };

        newAction = { ...action, payload: newPayload };
      }
      console.log('[ACTION] Broadcasting an action to:', gameId);
      console.log('[ACTION] Action being sent is:', newAction);
      socket.broadcast.to(gameId).emit('action', { action: newAction });
    });
  });
};

/**
 * Start the server
 */
const startServer = async () => {
  try {
    // Connect to MongoDB
    connectDB(process.env.ATLAS_URL);

    // Start the HTTP server
    httpServer.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is running on port ${process.env.PORT || 8000}`,
      );
    });

    // Start Socket.IO connection
    connectSockets();
  } catch (e) {
    console.log(e);
  }
};

startServer();

// Import required modules and setup environment variables using dotenv.config()
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Import MongoDB connection function and route handlers
import connectDB from './mongodb/connect.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import marketplaceRoutes from './routes/marketplaceRoutes.js';

dotenv.config();

// Create an Express application
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes for user, authentication, game, and marketplace
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/game', gameRoutes);
app.use('/api/v1/marketplace', marketplaceRoutes);

// Create an HTTP server using the Express app
const httpServer = createServer(app);

// Create a Socket.IO server with CORS configuration to allow all origins and specific methods
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

/**
 * GET route for checking server status
 * @route GET /
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
    // Handle joining a game
    socket.on('joinGame', async ({ gameId, name }) => {
      // Function to get the player count in a room
      const getPlayerCount = () => sizeOfRoom(io, gameId);

      // If there are already two players in the room, prevent joining
      if (getPlayerCount() === 2) {
        return;
      }

      // Set the username and join the game room
      socket.data.username = name;
      await socket.join(gameId);

      // Emit playerJoined event to all clients in the room
      io.in(gameId).emit('playerJoined', {
        playerCount: getPlayerCount(),
        name,
      });

      // Check if there are two players now, if yes, start the game
      if (getPlayerCount() === 2) {
        // Get all sockets in the room
        const sockets = await io.in(gameId).fetchSockets();

        // If any player has already started, return
        if (sockets[0].data.started || sockets[1].data.started) {
          return;
        }

        // Randomly determine which player starts the game
        const playerOneStarts = Math.random() >= 0.5;
        const [playerOne, playerTwo] = getSocketsInRoom(io, gameId);

        // Emit newGame event to both players with necessary game details
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

        // Mark both players as started to prevent multiple starts
        sockets[0].data.started = true;
        sockets[1].data.started = true;
      }
    });

    // Handle rejoining a game
    socket.on('rejoinGame', async ({ gameId, name }) => {
      // Set the username and join the game room
      socket.data.username = name;
      await socket.join(gameId);

      // Emit playerJoined event to all clients in the room
      io.in(gameId).emit('playerJoined', {
        playerCount: sizeOfRoom(io, gameId),
        name,
      });
    });

    // Handle leaving a game
    socket.on('leaveGame', ({ gameId }) => {
      // Emit playerLeft event to all clients in the room
      io.in(gameId).emit('playerLeft', {
        playerCount: sizeOfRoom(io, gameId),
      });
    });

    // Handle disconnection of a client
    socket.on('disconnect', () => {
      console.log('User Disconnected');
    });

    // Handle game actions
    socket.on('action', (payload) => {
      const { action } = payload;
      const { gameId } = payload;

      // Log current clients and the source of the action
      console.log('[ACTION] current clients:', getSocketsInRoom(io, gameId));
      console.log(
        '[ACTION] Current action from:',
        `Player${getSocketsInRoom(io, gameId).indexOf(socket.id) + 1}`,
      );

      // Validate if player is actually part of this game.
      if (!isSocketInRoom(io, gameId, socket.id)) {
        return;
      }

      // Reverse the target and source of the action if it's player vs. opponent
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

      // Broadcast the modified action to all clients in the room except the sender
      console.log('[ACTION] Broadcasting an action to:', gameId);
      console.log('[ACTION] Action being sent is:', newAction);
      socket.broadcast.to(gameId).emit('action', { action: newAction });
    });
  });
};

/**
 * Start the server and connect to the database
 */
export const startServer = async () => {
  try {
    // Connect to MongoDB using the provided Atlas URL
    connectDB(process.env.ATLAS_URL);

    // Start the HTTP server on the provided port or the default port 8000
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

// Export the app and startServer function
export default app;

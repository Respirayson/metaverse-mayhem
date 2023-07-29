import express from 'express';
import * as dotenv from 'dotenv';

import Game from '../mongodb/models/game.js';
import User from '../mongodb/models/user.js';

dotenv.config();

const router = express.Router();

/**
 * POST route for creating a new game
 * @route POST /api/v1/game/new
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.route('/new').post(async (req, res) => {
  // Generate a new random gameId
  const newGameId = Math.floor(100000 + Math.random() * 900000);

  // Create a new game with the generated gameId
  Game.create({ gameId: newGameId.toString() })
    .then((id) => res.json(id))
    .catch((err) => console.log(err));
});

/**
 * GET route for retrieving a game by gameId
 * @route GET /api/v1/game
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.route('/').get((req, res) => {
  // Get the gameId from the query parameters
  const gameId = req.query;

  // Find the game by the provided gameId
  Game.findOne(gameId)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

/**
 * DELETE route for deleting a game by gameId
 * @route DELETE /api/v1/game
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.route('/').delete((req, res) => {
  // Get the gameId from the query parameters
  const gameId = req.query;

  // Delete the game by the provided gameId
  Game.deleteOne(gameId)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

/**
 * POST route for updating user cards in a game
 * @route POST /api/v1/game/cards
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.route('/cards').post((req, res) => {
  // Extract the address and cards from the request body
  const { address, cards } = req.body;

  // Update the user's cards in the database
  User.updateOne({ publicAddress: address }, { $set: { cards } })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

/**
 * GET route for retrieving user cards in a game
 * @route GET /api/v1/game/cards
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.route('/cards').get((req, res) => {
  // Get the publicAddress from the query parameters
  const { publicAddress } = req.query;

  // Find the user by the provided publicAddress and return their cards
  User.findOne({ publicAddress })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

// Export the router
export default router;

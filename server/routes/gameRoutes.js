import express from 'express';
import * as dotenv from 'dotenv';

import Game from '../mongodb/models/game.js';

dotenv.config();

const router = express.Router();

router.route('/new').post(async (req, res) => {
  const newGameId = Math.floor(100000 + Math.random() * 900000);
  Game.create({ gameId: newGameId }).then((id) => res.json(id));
});

router.route('/').get((req, res) => {
  const gameId = req.query;
  Game.findOne(gameId).then((result) => res.json(result));
});

router.route('/').delete((req, res) => {
  const gameId = req.query;
  Game.deleteOne(gameId).then((result) => res.json(result));
});

export default router;

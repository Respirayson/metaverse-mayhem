import express from 'express';
import * as dotenv from 'dotenv';

import Game from '../mongodb/models/game.js';
import User from '../mongodb/models/user.js';

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

router.route('/cards').post((req, res) => {
  const { address, cards } = req.body;
  User.updateOne({ publicAddress: address }, { $set: { cards } })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route('/cards').get((req, res) => {
  const { publicAddress } = req.query;
  User.findOne({ publicAddress })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

export default router;

import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.route('/new').post(async (req, res) => {
  res.json({
    gameId: Math.floor(100000 + Math.random() * 900000),
  });
});

export default router;

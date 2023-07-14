import express from 'express';
import * as dotenv from 'dotenv';

import User from '../mongodb/models/user.js';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  const publicAddress = req.query;
  return User.findOne(publicAddress)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route('/').post((req, res) => {
  User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

export default router;

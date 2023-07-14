import express from 'express';
import * as dotenv from 'dotenv';

import Listing from '../mongodb/models/listing.js';

dotenv.config();

const router = express.Router();

router.route('/').get((req, res) => {
  const publicAddress = req.query;
  return Listing.findOne(publicAddress)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

router.route('/').post((req, res) => {
  Listing.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => console.log(err));
});

export default router;

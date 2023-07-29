import express from 'express';
import * as dotenv from 'dotenv';

import Listing from '../mongodb/models/listing.js';

dotenv.config();

const router = express.Router();

/**
 * GET route for retrieving all listings
 * @route GET /api/v1/marketplace
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.route('/').get(async (req, res) => {
  // Get all listings from the database
  Listing.find({})
    .then((listings) => res.json(listings))
    .catch((err) => console.log(err));
});

/**
 * POST route for creating a new listing
 * @route POST /api/v1/marketplace
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.route('/').post(async (req, res) => {
  // Check if the listing already exists in the database
  const listings = await Listing.find(req.body);

  if (listings.length === 0) {
    // If the listing doesn't exist, create a new one
    Listing.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => console.log(err));
  } else {
    // If the listing already exists, return an error response
    res.status(403).json({ message: 'Listing already exists' });
  }
});

/**
 * GET route for retrieving listings under a seller
 * @route GET /api/v1/marketplace/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.route('/:id').get((req, res) => {
  // Get the seller's id from the URL parameters
  const { id } = req.params;

  // Find listings associated with the seller's id
  Listing.find({ seller: id })
    .then((listing) => res.json(listing))
    .catch((err) => console.log(err));
});

/**
 * DELETE route for deleting a specific listing
 * @route DELETE /api/v1/marketplace/:id
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
router.route('/:id').delete((req, res) => {
  // Get the listing's id from the URL parameters
  const { id } = req.params;

  // Delete the listing by the provided id
  Listing.findByIdAndDelete(id)
    .then(() => res.json('Listing deleted.'))
    .catch((err) => console.log(err));
});

// Export the router
export default router;

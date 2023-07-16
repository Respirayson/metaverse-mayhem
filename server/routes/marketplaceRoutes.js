import express from "express";
import * as dotenv from "dotenv";

import Listing from "../mongodb/models/listing.js";

dotenv.config();

const router = express.Router();

router.route("/").get(async (req, res) => {
  // Get all Listings
  Listing.find({})
    .then((listings) => res.json(listings))
    .catch((err) => console.log(err));
});

router.route("/").post(async (req, res) => {
  // Create a new Listing
  const listings = await Listing.find(req.body);

  if (listings.length === 0) {
    Listing.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => console.log(err));
  } else {
    // Do nothing
    console.log("Listing already exists")
  }
});

router.route("/:id").get((req, res) => {
  // Get a specific Listing
  Listing.find({ seller: req.params.id })
    .then((listing) => res.json(listing))
    .catch((err) => console.log(err));
});

router.route("/:id").delete((req, res) => {
  // Delete a specific Listing
  Listing.findByIdAndDelete(req.params.id)
    .then(() => res.json("Listing deleted."))
    .catch((err) => console.log(err));
});

export default router;

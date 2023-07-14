import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  seller: { type: String, required: true },
  price: { type: Number, required: true },
  cardId: { type: Number, required: true },
  tokenId: { type: Number, required: true }, // NFT token ID in the contract
});

const Listing = mongoose.model("Listing", ListingSchema);

export default Listing;

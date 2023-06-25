import express from "express";
import * as dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const router = express.Router();

router.route("/new").post(async (req, res) => {
  console.log(req.body);

  res.json({
    gameId: uuidv4(),
  });
});



export default router;

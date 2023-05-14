import express from "express";
import * as dotenv from "dotenv";

import User from "../mongodb/models/user.js";

dotenv.config();

const router = express.Router();

router.route("/address").get((req, res) => {
    console.log("worked");
    res.send()
})

router.route("/address").post((req, res) => {
    const publicAddress = req.body;
    console.log(publicAddress.name);
    res.send()
})

export default router;
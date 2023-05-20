import express from "express";
import * as dotenv from "dotenv";
import { recoverPersonalSignature } from 'eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import jwt from 'jsonwebtoken';

import User from "../mongodb/models/user.js";

dotenv.config();

const router = express.Router();

router.route("/").post(async (req, res) => {
    const { signature, publicAddress } = req.body;

	if (!signature || !publicAddress)
		res.status(400).send({ error: 'Request should have signature and publicAddress' });

	var user = await User.findOne({ publicAddress: publicAddress })
    if (!user) {
        res.status(401).send({
            error: `User with publicAddress ${publicAddress} is not found in database`,
        });
    }
    
    // console.log(user)

    const msg = `I am signing my one-time nonce: ${user.nonce}`;

    // We now are in possession of msg, publicAddress and signature. We
    // will use a helper from eth-sig-util to extract the address from the signature
    const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
    const address = recoverPersonalSignature({
        data: msgBufferHex,
        sig: signature,
    });

    // The signature verification is successful if the address found with
    // sigUtil.recoverPersonalSignature matches the initial publicAddress
    if (address.toLowerCase() === publicAddress.toLowerCase()) {
        user.nonce = Math.floor(Math.random() * 10000);
        user = await user.save();
        const token = jwt.sign({
            id: user.id,
            address: user.publicAddress
        }, process.env.JWT_SECRET, {expiresIn: '6h'});
        console.log(token);
        res.status(200).json({
            success: true,
            token: token,
            user: user,
            msg: "You are now logged in."
        });

    } else {
        res.status(401).send({
            error: 'Signature verification failed',
    });
    }
})

router.route("/verify").post(async (req, res) => {

    const { token } = req.body;
    // console.log(token)
    var payload;
    try {
        payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({error: 'Invalid token'});
        }
        return res.status(400).json({error: 'Bad request'});
    }
    res.send(payload)

})

export default router;
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/', async (req, res) => {
    res.send("Hello from Metaverse Mayhem");
})

const startServer = async () => {

    try {
        connectDB(process.env.ATLAS_URL);
        app.listen(5000, () => {
            console.log("Server started on Port: 5000");
        })
    } catch (e) {
        console.log(e);
    }

    
}

startServer();
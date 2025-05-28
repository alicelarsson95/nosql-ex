import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from '../src/modules/users/userRoutes.js'
import movieRoutes from '../src/modules/movies/movieRoutes.js'
dotenv.config();

const app = express();
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
const port = 4000;

async function runServer() {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB connected");

    app.use('/', userRoutes);
    app.use('/movies', movieRoutes);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1); 
  }
}

runServer();

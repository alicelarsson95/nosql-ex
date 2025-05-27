import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

const mongoUri = process.env.MONGO_URI;
const port = 4000

mongoose
.connect(mongoUri)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("mongoDB error", err))

app.listen(port, () => console.log(`Servern körs på http://localhost:${port}`));

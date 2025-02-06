/**
 * STep one: import the express library
 * step 2: create the express application
 */

import express from 'express' // 1
import connectToDB from './db/db.js'
import dotenv from 'dotenv'
import cors from "cors"; // Import cors
import userRouter from './routes/user.js'


dotenv.config()
const app = express() //2

// Define allowed origins
const allowedOrigins = [
    "http://localhost:3000",
    "http://example1.com",
    "http://example2.com"
];

// Enable CORS
app.use(cors({
    origin: allowedOrigins, // Allow requests from your frontend
    credentials: true // Allow cookies if needed
}));

app.use(express.json())

app.use('/api/auth', userRouter)

app.listen(process.env.PORT, () => {
    connectToDB()
    console.log("Server is running")
})
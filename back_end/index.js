/**
 * STep one: import the express library
 * step 2: create the express application
 */

import express from 'express' // 1
import connectToDB from './db/db.js'
import dotenv from 'dotenv'
import userRouter from './routes/user.js'
import noteRouter from './routes/note.route.js'

import cors from 'cors' 


dotenv.config()
const app = express() //2

const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

app.use(cors({
    origin: allowedOrigins //allow requests from your frontend
}))

app.use(express.json())

//for user authentication
app.use('/api/auth', userRouter)

// for note
app.use('/api/note', noteRouter)


app.listen(process.env.PORT, () => {
    connectToDB()
    console.log("Server is running")
})
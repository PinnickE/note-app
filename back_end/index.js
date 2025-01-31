/**
 * STep one: import the express library
 * step 2: create the express application
 */

import express from 'express' // 1
import connectToDB from './db/db.js'
import dotenv from 'dotenv'
import userRouter from './routes/user.js'


dotenv.config()
const app = express() //2

app.use(express.json())

app.use('/api/auth', userRouter)

app.listen(process.env.PORT, () => {
    connectToDB()
    console.log("Server is running")
})
/**
 * STep one: import the express library
 * step 2: create the express application
 */

import express from 'express' // 1
import mongoose from 'mongoose'
import connectToDB from './db/db.js'
import dotenv from 'dotenv'


dotenv.config()
const app = express() //2

app.listen(process.env.PORT, () => {
    connectToDB
    console.log("Server is running")
})
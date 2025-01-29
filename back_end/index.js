/**
 * STep one: import the express library
 * step 2: create the express application
 */

import express from 'express' // 1

const app = express() //2

app.listen(5000, () => {
    console.log("Server is running")
})
import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt'

const router = express.Router()

/**
 * receives the user input
 * create the path that will listen for POST requests
 * gain the data that is been sent to the backend
 * check if the User already exist using the email
 * if user exist, send a response back to the frontend (success:false, message: user already exist)
 * encrypt the password ny hashing the password
 * after hashing the user pasword, create a new user object
 * save that object to the database
 * send the response back to the user(sucess:true, data)
 */
router.post('/register', async (req, res) => {
    console.log("It has entered this registered function")
    const {name, email, password} = req.body

    console.log("name, email, password: ", name, email, password)

    const user = await User.findOne({email}) 

    if(user) {
        return res.status(400).json({
            success: false,
            message: "User already exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUserObject = new User({
        name: name,
        email: email,
        password: hashedPassword
    })

    await newUserObject.save()

    return res.status(201).json({
        success: true,
        message: "Account Created Successfully"
    })
})



export default router


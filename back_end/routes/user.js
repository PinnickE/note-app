import express from 'express'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
   try {
    const {name, email, password} = req.body;

    const user = await User.findOne({email})
 
    if (user) {
      return res.status(400).json({
         success: false,
         message: "This user already exists."
      })
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserObject = new User({
      name: name,
      email: email,
      password: hashedPassword
    });
 
    await newUserObject.save()

    return res.status(200).json({
      success: true,
      message: "Sign-up successful."
   })
   } catch (error) {
    console.log("error from the backend", error)
      return res.status(500).json({
         success: false,
         message: "Server error."
      })
   }
})

/**
 * 
 *Steps for User Login
Receive User Input:

The route /login listens for POST requests.
The req.body contains the user’s email and password sent from the frontend.
Find the User by Email:

The database is searched to find a user with the provided email.
If no user is found, a response is sent with an error message saying "User Not exist."
Check the Password:

If the user exists, the entered password is compared with the stored (hashed) password using bcrypt.compare().
If the passwords don’t match, a response is sent with the message "Wrong Credentials."
Generate a Token:

If the credentials are correct, a JSON Web Token (JWT) is generated using jwt.sign().
The token contains the user’s ID and has an expiration time of 5 hours (expiresIn: "5h").
Send a Success Response:

A success message is sent back to the frontend, along with the token and the user’s name.
The frontend can use the token for authentication in future requests.
Handle Errors:

If an error occurs during the process (like a server issue), a response with a "Server Error" message is sent back. 
 * 
 * 
jsonwebtoken

JWT_TOKEN=secretkeyofnoteapp123@#

 */

router.post('/login', async (req, res) => {
    try {
      const {email, password} = req.body;

      const user = await User.findOne({email})

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User does not exist."
        })
      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (checkPassword === false) {
        return res.status(400).json({
          success: false,
          message: "Incorrect password"      
        })
      }

      else {
        const token = await jwt.sign({id: user.id,}, process.env.JWT_TOKEN, {expiresIn: "5m"})

        return res.status(200).json({
          success: true,
          message: "Login successful.",
          token,
          name: user.name,
          email: user.email,
          userId: user._id
        })
      };
 
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error."
      })
    }
})




export default router


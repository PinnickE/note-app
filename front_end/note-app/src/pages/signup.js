import React, { useState } from 'react'
import '../styles/signup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     //sends the request to the backend
    //     // const response = req.send
    //     //if (response.sucess == true)
    //     // sign this user in
    //     console.log("User Signup successfully: ", name, email, password)
    //     navigate('/login')
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post("http://localhost:5000/api/auth/register", {
            name,
            email,
            password
          });
      
          if (response.data.success) {
            alert("Account created successfully! Please log in.");
            navigate("/login");
          } else {
            alert(response.data.message);
          }
        } catch (error) {
          alert("Signup failed. Please try again.");
        }
      };
    
  return (
    <div className='signup_container'>
        <div className='signup_card'>
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input placeholder='Enter Name' id='name' onChange={(e) => setName(e.target.value)} type='text' required className='signup_input'/>
                </div>

                <div>
                    <label htmlFor='email'>Email</label>
                    <input placeholder='Enter Email' id='email' onChange={(e) => setEmail(e.target.value)} type='email' required className='signup_input'/>
                </div>

                <div>
                    <label htmlFor='name'>Password</label>
                    <input placeholder='************' id='password' onChange={(e) => setPassword(e.target.value)} type='password' required className='signup_input'/>
                </div>

                <div className='mt-3'>
                    <button type='submit' className='signup_btn'>Signup</button>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>

            </form>
        </div>
    </div>
  )
}

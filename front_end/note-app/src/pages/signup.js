import React, { useState } from 'react'
import '../styles/signup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage("")

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                name,
                email,
                password
            })

            console.log("response: ", response)

            if (response.data.success) {
                navigate('/login')
            } else if (response.status === 400) {
                setErrorMessage(response.data.message)
            }

            console.log(response.data.message)
            // navigate('/login')
        } catch (error) {
            console.log("error insconsole: ", error)
            if (error.response.status === 400){
                setErrorMessage(error.response.data.message)
            }
        }
    }
    
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

                    {errorMessage && <p style={{color: "red", fontSize: "14px"}}>{errorMessage}</p>}

                    
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
import React, {useContext, useState} from 'react'
import "../styles/login.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../contexts/authContext';

export default function Login() {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState("")
  const {login} = useContext(AuthContext)

  console.log("user email before signup: ", userEmail)

  /**
   * TASK: It should display error message instead of an alert
   */

  const submitLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: loginEmail,
        password: loginPassword
      });

      if (response.data.success) {
        // localStorage.setItem("token", response.data.token)
        // localStorage.setItem("email", response.data.email)
        // localStorage.setItem("name", response.data.name)

        login(response.data.name, response.data.email, response.data.token, response.data.userId)
        setUserEmail(localStorage.getItem('email'))
        console.log("user email after signup: ", userEmail)
        navigate('/dashboard')
      } else {
        setErrorMessage(response.data.message)
      }
    } catch (error) {
      if (!error.response.data.success) {
        setErrorMessage(error.response.data.message)
      } else {
        setErrorMessage("Login failed. plaease check your credentials")
      }
    }
  }

  return (
    <div className='login_container'>
      <div className='login_card'>
        <h2>Login</h2>
        <form onSubmit={submitLogin}>
          <div className='input_segment'>
            <label htmlFor='email'>Email</label>
            <input placeholder='Enter Email' required type='email' id='email' onChange={(e) => setLoginEmail(e.target.value)}/>
          </div>

          <div className='input_segment'>
            <label htmlFor='password'>Password</label>
            <input placeholder='Enter Password' required type='password' id='password' onChange={(e) => setLoginPassword(e.target.value)}/>
            {errorMessage && <p style={{color: "red", fontSize: "14px"}}>{errorMessage}</p>}
          </div>

          <div className='action'>
            <button>Login</button>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          </div>
        </form>

        <div>{userEmail}</div>
      </div>
    </div>
  )
}

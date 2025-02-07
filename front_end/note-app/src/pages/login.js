import React, {useState} from 'react'
import "../styles/login.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  console.log("user email before signup: ", userEmail)

  const submitLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email: loginEmail,
        password: loginPassword
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("email", response.data.email)
        localStorage.setItem("name", response.data.name)

        setUserEmail(localStorage.getItem('email'))
        console.log("user email after signup: ", userEmail)
        navigate('/dashboard')
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      if (!error.response.data.success) {
        alert(error.response.data.message)
      } else {
        alert("Login failed. plaease check your credentials")
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

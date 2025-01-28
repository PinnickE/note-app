import React, {useState} from 'react'
import "../styles/login.css"
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const submitLogin = (e) => {
    e.preventDefault();
    console.log("You have successfully logged in with the following details: ", loginEmail, loginPassword);
    navigate("/dashboard");
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
      </div>
    </div>
  )
}

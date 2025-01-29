import React from 'react'
import "../styles/header.css"
import { Link, useNavigate } from 'react-router-dom'

export default function Header () {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }
  return (
    <div className='header_container'>
        <h3 className='logo'>
          <Link to="/">NoteApp</Link>
        </h3>
        <input placeholder='Search notes...' id='search'/>

        <div className='profile_box'>
            <span className='username'>Username</span>
            <Link to="/login">
              Login
            </Link>
            <Link to="/signup">
              Sign in
            </Link>
            <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

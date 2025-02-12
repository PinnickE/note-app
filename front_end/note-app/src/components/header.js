import React, { useEffect, useState } from 'react'
import "../styles/header.css"
import { Link, useNavigate } from 'react-router-dom'

export default function Header () {
  const navigate = useNavigate()
  const [name, setName] = useState('');

  useEffect(() => {
    setName(localStorage.getItem('name'))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    navigate('/login')
  }
  return (
    <div className='header_container'>
        <h3 className='logo'>
          <Link to="/">NoteApp</Link>
        </h3>
        <input placeholder='Search notes...' id='search'/>

        <div className='profile_box'>
            {/* <span className='username'>{name}</span> */}
            {/* if user is not null, render only name and logout else render login and signin  ?:*/}
            {name ? (
              <div>
                <span className='username'>{name}</span>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
              </div>
            )}
            {/* <Link to="/login">
              Login
            </Link>
            <Link to="/signup">
              Sign in
            </Link>
            <button onClick={handleLogout}>Logout</button> */}
        </div>
    </div>
  )
}

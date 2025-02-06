import React, { useEffect, useState } from 'react'
import "../styles/header.css"
import { Link, useNavigate } from 'react-router-dom'

export default function Header () {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className='header_container'>
        <h3 className='logo'>
          <Link to="/">NoteApp</Link>
        </h3>
        <input placeholder='Search notes...' id='search'/>

        <div className="profile_box">
        {user ? (
          <>
            <span className="username">{user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </div>
  )
}

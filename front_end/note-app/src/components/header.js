import React, { useContext } from "react";
import "../styles/header.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="header_container">
      <h3 className="logo">
        <Link to="/">NoteApp</Link>
      </h3>
      <input placeholder="Search notes..." id="search" />

      <div className="profile_box">
        {user ? (
          <div>
            <span className="username">{user}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </div>
    </div>
  );
}

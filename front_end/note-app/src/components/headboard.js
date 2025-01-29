import React from 'react'
import "../styles/headboard.css"

export default function Headboard() {
  return (
    <div className='headboard_container'>
        <h3 className='logo'>
            NoteApp
        </h3>
        <input placeholder='Search notes...' id='search'/>

        <div className='profile_box'>
            <p className='userName'>Name</p>
            <button>Logout</button>
        </div>
    </div>
  )
}

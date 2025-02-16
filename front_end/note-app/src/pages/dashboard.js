import React, { useContext } from 'react'
import Header from '../components/header'
import "../styles/dashboard.css"
import Dashcard from '../components/dashcard'
import { AuthContext } from '../contexts/authContext'


export default function Dashboard() {
  const {name} = useContext(AuthContext)
  return (
    <div>
      {/* <Header></Header> */}

      <div className='row'>
        <Dashcard name= "Meeting" note="Office meeting starts at 9 O'Clock"></Dashcard>
        <Dashcard name= "Gym" note="Gym time tonight"></Dashcard>
        <Dashcard name= "Study" note="Study new book"></Dashcard>
      </div>
      <div className='row'>
        <Dashcard name= "Play" note="Play football"></Dashcard>
        <Dashcard name= "Research" note="Study for research"></Dashcard>
        <Dashcard name= "Prepare" note="Prepare PC"></Dashcard>
      </div>

      <div>
        this is the name of the current user: {name}
      </div>
      
    </div>
  )
}

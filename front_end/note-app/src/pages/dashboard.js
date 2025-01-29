import React from 'react'
import Headboard from '../components/headboard'
import "../styles/dashboard.css"
import Dashcard from '../components/dashcard'


export default function Dashboard() {
  return (
    <div>
      <Headboard></Headboard>

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
      
    </div>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/header'
import "../styles/dashboard.css"
import Dashcard from '../components/dashcard'
import { AuthContext } from '../contexts/authContext'
import axios from 'axios'



export default function Dashboard() {
  const {name, userId} = useContext(AuthContext)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({
    title: "",
    description: ""
  })

  console.log("userId in dashboard component: ",userId)

  useEffect(() => {
    fetchNotes(userId)
    console.log("Notes info in useeffect: ", notes)
  }, [userId])

  //the below is to check for notes in the variable
  // useEffect(() => {
  //   console.log("Notes info in useeffect: ", notes)
  // }, [notes])

  

  //fetch the notes for a particular user
    const fetchNotes = async (userId) => {
      try {
        const response = await axios.get("http://localhost:5000/api/note/get-notes-by-user", {
          params: {userId}
        });
        setNotes(response.data.allNotes)
        console.log("Notes info: ", notes)
        console.log("responses from the backend containing the notes", response)
      } catch (error) {
        console.error("Error fetching user notes: ", error)
      }
    }

    /**
     * notes = ["1", "2", "3"]
     * 
     * notes = ["1", "2", "5", "4"]
     * 
     * var a = 6
     * var a = 9
     */

  // Add note implementation
  const handleAddNote = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/note/create-note", {
        ...newNote,
        userId
      });
      setNotes([...notes, response.data.note])
      setNewNote({title: "", description: ""})
      console.log("responses from the backend containing the notes", response)
    } catch (error) {
      console.error("Error creating user notes: ", error)
    }
  }

  console.log("hello wordl", notes)
  console.log(`hello world ${notes}`)

  // Update note implementation
  const handleEditNote = async (updatedNote) => {
    try {
      console.log("updated note that was selected: ", updatedNote)
      const response = await axios.put(`http://localhost:5000/api/note/update-note/${updatedNote._id}`,updatedNote);
      setNotes(notes.map(note => note._id === updatedNote._id ? response.data.note : note))
      
    } catch (error) {
      console.error("Error creating user notes: ", error)
    }
  }

  // Delete note implementation
  const handleDeleteNote = async (noteId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/note/delete-note/${noteId}`);
      setNotes(notes.filter(note => note._id !== noteId))
    } catch (error) {
      console.error("Error creating user notes: ", error)
    }
    console.log("noteId inside handledeletenote: ", noteId)
  }


  return (
    <div>
      <div>
        <input 
          type='text' 
          placeholder='Title' 
          value={newNote.title}
          onChange={(e) => setNewNote({...newNote, title: e.target.value})}/>

        <input 
          type='text' 
          placeholder='Description' 
          value={newNote.description}
          onChange={(e) => setNewNote({...newNote, description: e.target.value})}/>

          <button onClick={handleAddNote}>Add Note</button>
      </div>
      <div className='row'>
        {notes.map((note) => (
          <Dashcard 
            key={note._id}
            name={note.title}
            note={note.description}
            onEdit={(updatedNote) => handleEditNote({... updatedNote, _id: note._id})}
            onDelete={() => handleDeleteNote(note._id)}/>
        ))}
      </div>

      
      
    </div>
  )
}

/**
 * The dashcard has to be clickable - onclick
 * for handle edit click event
 * for handle delete click event
 * name
 * note
 */
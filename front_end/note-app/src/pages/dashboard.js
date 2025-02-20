import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/header'
import "../styles/dashboard.css"
import Dashcard from '../components/dashcard'
import { AuthContext } from '../contexts/authContext'
import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api',  // Change to your actual backend URL
});

// export default function Dashboard() {
//   const {name} = useContext(AuthContext)
//   return (
//     <div>
//       {/* <Header></Header> */}

//       <div className='row'>
//         <Dashcard name= "Meeting" note="Office meeting starts at 9 O'Clock"></Dashcard>
//         <Dashcard name= "Gym" note="Gym time tonight"></Dashcard>
//         <Dashcard name= "Study" note="Study new book"></Dashcard>
//       </div>
//       <div className='row'>
//         <Dashcard name= "Play" note="Play football"></Dashcard>
//         <Dashcard name= "Research" note="Study for research"></Dashcard>
//         <Dashcard name= "Prepare" note="Prepare PC"></Dashcard>
//       </div>
      
//     </div>
//   )
// }

export default function Dashboard() {
  const { name } = useContext(AuthContext)
  const { userId } = useContext(AuthContext); // Assuming `user` contains `id`
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({ title: '', description: '' })

  // useEffect(() => {
  //   fetchNotes()
  // }, [])

  useEffect(() => {
    if (userId) {
      fetchNotes(userId);
      console.log('userId in dashboard useeffect:', userId); // Debugging
    }
    // console.log('userId in dashboard useeffect which is null:', userId); 

  }, [userId]);

  // const fetchNotes = async () => {
  //   try {
  //     const response = await API.get('/note/get-notes');
  //     setNotes(response.data.notes)
  //   } catch (error) {
  //     console.error('Error fetching notes:', error)
  //   }
  // }

  const fetchNotes = async (userId) => {
    try {
      const response = await API.get('/note/get-notes-by-user', {
        params: { userId } // Send userId as a query param
      });
      setNotes(response.data.allNotes);
    } catch (error) {
      console.error('Error fetching user notes:', error);
    }
  };

  const handleAddNote = async () => {
    try {
      const response = await API.post('/note/create-note', {
        ...newNote,
        userId // assuming user.id is the correct value
      });
      setNotes([...notes, response.data.note]);
      setNewNote({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleEditNote = async (updatedNote) => {
    try {
      const response = await API.put(`/note/update-note/${updatedNote._id}`, updatedNote); // Fixed API path
      setNotes(notes.map(note => note._id === updatedNote._id ? response.data.note : note));
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await API.delete(`/note/delete-note/${noteId}`); // Fixed API path
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      {/* <Header /> */}

      <div className='add-note-form'>
        <input
          type='text'
          placeholder='Title'
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <input
          type='text'
          placeholder='Description'
          value={newNote.description}
          onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      <div className='row'>
        {notes.map((note) => (
          <Dashcard
            key={note._id}
            name={note.title}
            note={note.description}
            onEdit={(updatedNote) => handleEditNote({ ...updatedNote, _id: note._id })}
            onDelete={() => handleDeleteNote(note._id)}
          />
        ))}
      </div>
    </div>
  )
}
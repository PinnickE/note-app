import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/header';
import "../styles/dashboard.css";
import Dashcard from '../components/dashcard';
import { AuthContext } from '../contexts/authContext';
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',  // Change to your actual backend URL
});

export default function Dashboard() {
  const { name, userId } = useContext(AuthContext); // assuming userId is available here
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', description: '' });
  const [selectedNote, setSelectedNote] = useState(null); // for modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchNotes(userId);
      console.log('userId in dashboard useEffect:', userId);
    }
  }, [userId]);

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
        userId // passing userId so that note is linked to the user
      });
      setNotes([...notes, response.data.note]);
      setNewNote({ title: '', description: '' });
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleEditNote = async (updatedNote) => {
    try {
      const response = await API.put(`/note/update-note/${updatedNote._id}`, updatedNote);
      setNotes(notes.map(note => note._id === updatedNote._id ? response.data.note : note));
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await API.delete(`/note/delete-note/${noteId}`);
      setNotes(notes.filter(note => note._id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // When a note is clicked, open modal with note details
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedNote(null);
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
          // Pass the note click handler to Dashcard
          <Dashcard
            key={note._id}
            name={note.title}
            note={note.description}
            onClick={() => handleNoteClick(note)}
            onEdit={(updatedNote) => handleEditNote({ ...updatedNote, _id: note._id })}
            onDelete={() => handleDeleteNote(note._id)}
          />
        ))}
      </div>

      {/* Modal for displaying note details */}
      {showModal && selectedNote && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedNote.title}</h2>
            <p>{selectedNote.description}</p>
            {/* You can add more note info here if available */}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

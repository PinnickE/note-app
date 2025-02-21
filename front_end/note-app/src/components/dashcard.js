import React, { useState } from 'react'
import "../styles/dashcard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

export default function Dashcard(props) {
  let cardName = props.name;
  let cardNote = props.note
  let onEdit = props.onEdit;
  const [editedNote, setEditedNote] = useState({title: cardName, description: cardNote})
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = (e) => {
    onEdit && onEdit(editedNote)
    setIsEditing(false)
  }
  return (
    <div>
      <div className='card_container'>
        <h4 className='card_head'>{cardName}</h4>
        <p className='card-text'>{cardNote}</p>

        <div className='icons'>
          <button className='pen' onClick={(e) => setIsEditing(true)}><FontAwesomeIcon icon={faPenToSquare} /></button>
          <button className='trash'><FontAwesomeIcon icon={faTrash} /></button>
        </div>
      </div>

      {isEditing && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2>Edit Note</h2>
            <input type='text' value={editedNote.title} onChange={(e) => setEditedNote({...editedNote, title: e.target.value})}/>
            <textarea value={editedNote.description} onChange={(e) => setEditedNote({...editedNote, description: e.target.value})}/>

            <div>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      


    </div>
    
  )
}

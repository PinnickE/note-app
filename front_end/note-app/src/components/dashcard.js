import React, { useState } from 'react'
import "../styles/dashcard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

// export default function Dashcard(props) {
//   let cardName = props.name;
//   let cardNote = props.note
//   return (
//     <div className='card_container'>
//         <h4 className='card_head'>{cardName}</h4>
//         <p className='card-text'>{cardNote}</p>

//         <div className='icons'>
//           <div className='pen'><FontAwesomeIcon icon={faPenToSquare} /></div>
//           <div className='trash'><FontAwesomeIcon icon={faTrash} /></div>
//         </div>
//     </div>
//   )
// }


export default function Dashcard(props) {
  const { name, note, onEdit, onDelete } = props
  const [isEditing, setIsEditing] = useState(false)
  const [editedNote, setEditedNote] = useState({ title: name, description: note })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onEdit(editedNote)
    setIsEditing(false)
  }

  return (
    <div className='card_container'>
      {isEditing ? (
        <div>
          <input
            type='text'
            value={editedNote.title}
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
          />
          <input
            type='text'
            value={editedNote.description}
            onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h4 className='card_head'>{name}</h4>
          <p className='card-text'>{note}</p>
        </div>
      )}

      <div className='icons'>
        <div className='pen' onClick={handleEdit}><FontAwesomeIcon icon={faPenToSquare} /></div>
        <div className='trash' onClick={onDelete}><FontAwesomeIcon icon={faTrash} /></div>
      </div>
    </div>
  )
}
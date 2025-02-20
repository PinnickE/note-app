// import React, { useState } from 'react'
// import "../styles/dashcard.css"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

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


// Dashcard.js
import React from 'react';

export default function Dashcard({ name, note, onClick, onEdit, onDelete }) {
  return (
    <div className="dashcard" onClick={onClick}>
      <h3>{name}</h3>
      <p>{note}</p>
      <div className="actions">
        <button onClick={(e) => { e.stopPropagation(); onEdit && onEdit({ title: name, description: note }); }}>Edit</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete && onDelete(); }}>Delete</button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';

export default function Dashcard({ name, note, onEdit, onDelete, onClick }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({ title: name, description: note });

  const handleSave = () => {
    onEdit && onEdit(editedNote);
    setIsEditing(false);
  };

  return (
    <div className="dashcard" onClick={onClick}>
      <h3>{name}</h3>
      <p>{note}</p>
      <div className="actions">
        <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>Edit</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }}>Delete</button>
      </div>
      
      {isEditing && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Edit Note</h2>
            <input
              type="text"
              value={editedNote.title}
              onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
            />
            <textarea
              value={editedNote.description}
              onChange={(e) => setEditedNote({ ...editedNote, description: e.target.value })}
            />
            <div className="modal-actions">
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

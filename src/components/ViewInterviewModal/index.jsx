/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './style.css';
import { Clock, MapPin, Timer, FileText, X, Plus, Trash2 } from 'lucide-react';
import { formatDateTime } from '../../service/formatDate';
import { getinterviewNotesAsync, getNoteByIdAsync, addInterviewNoteAsync, deleteNoteByIdAsync } from '../../service/apiClient';

const ViewInterviewModal = ({ interview }) => {
  const [currentInterview, setCurrentInterview] = useState(null);
  // TODO: Replace using backend data later
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAllNotes, setShowAllNotes] = useState(false);

  useEffect(() => {
    console.log(interview)
    setCurrentInterview(interview);
  }, [interview]);

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), content: newNote.trim() }]);
      setNewNote('');
    }
  };

  const deleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  return (
    <>
      <div className="modal-container">
        <div className="modal-header">
          {/* TODO: Update using correct backend property later */}
          <h2 className="modal-title">{currentInterview?.title}</h2>
          {/* ADD CLOSE BUTTON STUFF HERE */}
        </div>
        
        <h4 className="modal-company">{currentInterview?.companyName}</h4>

        <div className="content-container">
          <div className="info-item">
            <Clock className="icon" />
            <div className="info-content">
              <div className="info-label">Time</div>
              {/* TODO: Update using correct backend property later */}
              <div className="info-text">{formatDateTime(currentInterview?.time)}</div>
            </div>
          </div>

          <div className="info-item">
            <MapPin className="icon" />
            <div className="info-content">
              <div className="info-label">Address</div>
              {/* TODO: Update using correct backend property later */}
              <div className="info-text">{currentInterview?.address}</div>
            </div>
          </div>

          <div className="info-item">
            <FileText className="icon" />
            <div className="info-content">
              <div className="info-label">Description</div>
              {/* TODO: Update using correct backend property later */}
              <div className="info-text">{currentInterview?.description}</div>
            </div>
          </div>

          <div className="info-item">
            <Timer className="icon" />
            <div className="info-content">
              <div className="info-label">Duration</div>
              {/* TODO: Update using correct backend property later */}
              <div className="info-text">{currentInterview?.duration} mins</div>
            </div>
          </div>

          {/* TODO: Update using backend data later */}
          <div className="notes-section">
            <div className="info-label">Notes</div>

            <div className="add-note">
              <input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a new note..."
                className="note-input"
              />
              <button onClick={addNote} className="add-button">
                <Plus className="icon-small" />
              </button>
            </div>

            <div className="notes-grid">
              {notes.slice(0, showAllNotes ? notes.length : 3).map((note) => (
                <div key={note.id} className="note-container">
                  <div className="note-header">
                    <div className="note-title">NOTE TITLE </div>
                    <button onClick={() => deleteNote(note.id)} className="delete-button">
                      <Trash2 className="icon-small" />
                    </button>
                  </div>
                  <div className="note-description">{note.content}</div>
                </div>
              ))}

              {notes.length > 3 && (
                <button className="toggle-button" onClick={() => setShowAllNotes(!showAllNotes)}>
                  {showAllNotes ? 'See Less Notes' : 'See All Notes'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewInterviewModal;

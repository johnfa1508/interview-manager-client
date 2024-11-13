/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import useModal from '../../hooks/useModal';
import './style.css';
import { Clock, MapPin, Timer, FileText, X, Plus, Trash2 } from 'lucide-react';
import { formatDateTime } from '../../service/formatDate';

const ViewInterviewModal = ({ interview }) => {
  const [currentInterview, setCurrentInterview] = useState(null);
  // TODO: Replace using backend data later
  const [notes, setNotes] = useState([
    { id: 1, content: 'Prepare technical questions' },
    { id: 2, content: 'Review company background' }
  ]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
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
          <h2 className="modal-title">{currentInterview?.Job_title}</h2>
          {/* ADD CLOSE BUTTON STUFF HERE */}
        </div>

        <div className="content-container">
          <div className="info-item">
            <Clock className="icon" />
            <div className="info-content">
              <div className="info-label">Time</div>
              {/* TODO: Update using correct backend property later */}
              <div className="info-text">{formatDateTime(currentInterview?.Time)}</div>
            </div>
          </div>

          <div className="info-item">
            <MapPin className="icon" />
            <div className="info-content">
              <div className="info-label">Address</div>
              {/* TODO: Update using correct backend property later */}
              <div className="info-text">{currentInterview?.Address}</div>
            </div>
          </div>

          <div className="info-item">
            <FileText className="icon" />
            <div className="info-content">
              <div className="info-label">Description</div>
              {/* TODO: Update using correct backend property later */}
              <div className="info-text">{currentInterview?.Description}</div>
            </div>
          </div>

          <div className="info-item">
            <Timer className="icon" />
            <div className="info-content">
              <div className="info-label">Duration</div>
              {/* TODO: Update using correct backend property later */}
              <div className="info-text">{currentInterview?.Duration_In_Minutes} mins</div>
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
              {notes.map((note) => (
                <div key={note.id} className="note-card">
                  <div className="note-content">{note.content}</div>
                  <button onClick={() => deleteNote(note.id)} className="delete-button">
                    <Trash2 className="icon-small" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewInterviewModal;

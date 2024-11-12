/* eslint-disable no-unused-vars */
import { useState } from 'react';
import useModal from '../../hooks/useModal';
import './style.css';
import { Clock, MapPin, Timer, FileText, X, Plus, Trash2 } from "lucide-react";
import './style.css';

const ViewInterviewModal = () => {
  // Use the useModal hook to get the closeModal function so we can close the modal on user interaction
  const { closeModal } = useModal();

  const [message, setMessage] = useState(null);
  const [text, setText] = useState('');
  const [notes, setNotes] = useState([
    { id: 1, content: "Prepare technical questions" },
    { id: 2, content: "Review company background" }
  ]);
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), content: newNote.trim() }]);
      setNewNote("");
    }
  };

  const deleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

    //remove submit
  const onSubmit = async () => {
    setMessage('Submit button was clicked! Closing modal in 1 seconds...');
    setTimeout(() => {
      setMessage(null);
      closeModal();
    }, 1000);
  };

  return (
    <>
       <div className="modal-container">
      <div className="modal-header">
        <h2 className="modal-title">Senior Developer Interview</h2>
        {/* ADD CLOSE BUTTON STUFF HERE */}
      </div>

      <div className="content-container">
        <div className="info-item">
          <Clock className="icon" />
          <div className="info-content">
            <div className="info-label">Time</div>
            <div className='info-text'>November 15, 2024 10:00 AM</div>
          </div>
        </div>

        <div className="info-item">
          <MapPin className="icon" />
          <div className="info-content">
            <div className="info-label">Address</div>
            <div className='info-text'>123 Tech Street, Silicon Valley</div>
          </div>
        </div>

        <div className="info-item">
          <FileText className="icon" />
          <div className="info-content">
            <div className="info-label">Description</div>
            <div className='info-text'>Technical interview for senior developer position</div>
          </div>
        </div>

        <div className="info-item">
          <Timer className="icon" />
          <div className="info-content">
            <div className="info-label">Duration</div>
            <div className='info-text'>1 hour</div>
          </div>
        </div>

        <div className="notes-section">
          <div className="info-label">Notes</div>
          
          <div className="add-note">
            <input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addNote()}
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
                <button
                  onClick={() => deleteNote(note.id)}
                  className="delete-button"
                >
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

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import './style.css';
import { Clock, MapPin, Timer, FileText, X, Plus, Trash2 } from 'lucide-react';
import { formatDateTime } from '../../service/formatDate';
import {
  getNotesByUserInterviewIdAsync,
  addInterviewNoteAsync,
  deleteNoteByIdAsync
} from '../../service/apiClient';

const ViewInterviewModal = ({ interview }) => {
  const [currentInterview, setCurrentInterview] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [noteFormData, setNoteFormData] = useState({
    title: '',
    content: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentInterview(interview);

    fetchNotes();
  }, [interview]);

  const fetchNotes = async () => {
    try {
      const notesData = await getNotesByUserInterviewIdAsync(interview.id);

      setNotes(notesData.$values);
    } catch (err) {
      setError(err.message);
      // TODO: Snackbar
    }
  };

  const addNote = async () => {
    if (noteFormData.title.trim() && noteFormData.content.trim()) {
      try {
        const addedNote = await addInterviewNoteAsync(interview.id, noteFormData);

        setNotes([addedNote, ...notes]);
        setNoteFormData({ title: '', content: '' });
      } catch (err) {
        setError('Failed to add note');
        console.error('Failed to add note', err);
        // TODO: Snackbar
      } finally {
        // TODO: Snackbar
      }
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await deleteNoteByIdAsync(noteId);

      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (err) {
      setError('Failed to delete note');
      console.error('Failed to delete note with ID: ${noteId}', err);
      // TODO: Snackbar
    } finally {
      // TODO: Snackbar
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteFormData({ ...noteFormData, [name]: value });
  };

  const getFilteredNotes = () => {
    return showAllNotes ? notes : notes.slice(0, 3);
  };

  return (
    <>
      <div className="interview-modal-container">
        <div className="interview-modal-content-container">
          <h4 className="modal-company">{currentInterview?.companyName}</h4>

          <div className="info-item">
            <Clock className="icon" />

            <div className="info-content">
              <div className="info-label">Time</div>
              <div className="info-text">{formatDateTime(currentInterview?.time)}</div>
            </div>
          </div>

          <div className="info-item">
            <MapPin className="icon" />

            <div className="info-content">
              <div className="info-label">Address</div>
              <div className="info-text">{currentInterview?.address}</div>
            </div>
          </div>

          <div className="info-item">
            <FileText className="icon" />

            <div className="info-content">
              <div className="info-label">Description</div>
              <div className="info-text">{currentInterview?.description}</div>
            </div>
          </div>

          <div className="info-item">
            <Timer className="icon" />

            <div className="info-content">
              <div className="info-label">Duration</div>
              <div className="info-text">{currentInterview?.duration} mins</div>
            </div>
          </div>

          <div className="notes-section">
            <div className="info-label">Notes</div>

            <div className="add-note">
              <input
                value={noteFormData.title}
                onChange={handleChange}
                name="title"
                placeholder="Add a new title..."
                className="note-input"
              />

              <input
                value={noteFormData.content}
                onChange={handleChange}
                name="content"
                placeholder="Add a new note..."
                className="note-input"
              />

              <button onClick={addNote} className="add-button">
                <Plus className="icon-small" />
              </button>
            </div>

            <div className="notes-grid">
              {getFilteredNotes().map((note) => (
                <div key={note.id} className="note-container">
                  <div className="note-header">
                    <div className="note-title">{note.title}</div>

                    <button onClick={() => deleteNote(note.id)} className="delete-button">
                      <Trash2 className="icon-small delete-button" />
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

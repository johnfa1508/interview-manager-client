/* eslint-disable react/prop-types */
import './style.css';

export default function DecisionModal({ onEdit, onDelete, onArchive, closeModal, position }) {
  return (
    <div className="decision-modal" style={{ top: position.top, left: position.left }}>
      <div className="decision-modal-content">
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onArchive}>Archive</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  );
}

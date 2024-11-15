/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useModal from '../../hooks/useModal';
import './style.css';

export default function InterviewFormModal({ interview, isEditing }) {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    address: '',
    time: '',
    duration: '',
    description: ''
  });
  const { closeModal } = useModal();

  useEffect(() => {
    if (interview) {
      const localTime = new Date(interview.time).toISOString().slice(0, 16);

      setFormData({
        title: interview.title,
        companyName: interview.companyName,
        address: interview.address,
        time: localTime,
        duration: interview.duration,
        description: interview.description
      });
    }
  }, [interview]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'duration' ? Number(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      time: `${formData.time}:00.000Z` // Quick fix to avoid timezone issue
    };

    if (isEditing) {
      console.log('Updated interview:', formattedData);
      // TODO: Send formattedData to backend for editing
    } else {
      console.log('Created interview:', formattedData);
      // TODO: Send formattedData to backend for creation
    }
    closeModal();
  };

  return (
    <div className="interview-form-modal-container">
      <div className="interview-form-content-container">
        <form onSubmit={handleSubmit}>
          <div className="interview-form-group">
            <label htmlFor="title">Title*</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="interview-form-group">
            <label htmlFor="companyName">Company Name*</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="interview-form-group">
            <label htmlFor="address">Address*</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="interview-form-group">
            <label htmlFor="time">Date and time*</label>
            <input
              type="datetime-local"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          {/* FIXME: Accepts the char 'e' right now */}
          <div className="interview-form-group">
            <label htmlFor="duration">Duration (minutes)*</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>

          <div className="interview-form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="interview-form-submit-button">
            {isEditing ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}

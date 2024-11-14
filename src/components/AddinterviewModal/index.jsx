/* eslint-disable react/prop-types */
import { useState } from 'react';
import useModal from '../../hooks/useModal';
import './style.css';

export default function AddInterviewModal() {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    address: '',
    time: '',
    duration: '',
    description: ''
  });
  const { closeModal } = useModal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    closeModal();
    // TODO: Send formData to backend
  };

  return (
    <div className="add-interview-modal-container">
      <div className="add-interview-content-container">
        <form onSubmit={handleSubmit}>
          <div className="add-interview-form-group">
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

          <div className="add-interview-form-group">
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

          <div className="add-interview-form-group">
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

          <div className="add-interview-form-group">
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

          <div className="add-interview-form-group">
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

          <div className="add-interview-form-group">
            <label htmlFor="description">Description*</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="add-interview-submit-button">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

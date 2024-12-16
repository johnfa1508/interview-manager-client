/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useModal from '../../../hooks/useModal';
import './style.css';
import { createUserInterviewAsync, updateUserInterviewAsync } from '../../../service/apiClient';
import Snackbar from '../../common/snackbar';
import useSnackbar from '../../../hooks/useSnackbar';
import useAuth from '../../../hooks/useAuth';

export default function InterviewFormModal({ interview, isEditing, fetchInterviews }) {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    address: '',
    time: '',
    duration: '',
    description: ''
  });
  const { closeModal } = useModal();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loggedInUser } = useAuth();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      time: `${formData.time}:00.000Z` // Quick fix to avoid timezone issue
    };

    setIsSubmitting(true);

    if (isEditing) {
      await updateUserInterviewAsync(interview.id, formattedData);
      showSnackbar('Interview updated successfully!', 'success');
    } else {
      await createUserInterviewAsync(loggedInUser.id, formattedData);
      showSnackbar('Interview created successfully!', 'success');
    }

    setIsSubmitting(false);
    await fetchInterviews();

    // Wait for the Snackbar to finish closing before closing the modal
    setTimeout(() => {
      closeModal();
    }, 3000); // Match the Snackbar display duration
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
              min="0"
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

          <button type="submit" className="interview-form-submit-button" disabled={isSubmitting}>
            {isSubmitting
              ? isEditing
                ? 'Updating...'
                : 'Creating...'
              : isEditing
              ? 'Update'
              : 'Create'}
          </button>
        </form>
      </div>

      {snackbar.isOpen && (
        <Snackbar message={snackbar.message} type={snackbar.type} onClose={closeSnackbar} />
      )}
    </div>
  );
}

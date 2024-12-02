/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useModal from '../../hooks/useModal';
import { logLabels } from '../../service/constants';
import './style.css';
import {
  getUserInterviewsByUserIdAsync,
  createLogAsync,
  updateLogByIdAsync
} from '../../service/apiClient';
import useSnackbar from '../../hooks/useSnackbar';
import Snackbar from '../snackbar';
import useAuth from '../../hooks/useAuth';

export default function LogFormModal({ log, isEditing, fetchLogbookData }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    interviewId: '',
    label: []
  });
  const { closeModal } = useModal();
  const [interviews, setInterviews] = useState([]);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const { loggedInUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (log) {
      setFormData({
        title: log.title,
        content: log.content,
        interviewId: log.interviewId,
        label: log.label || []
      });
    }
  }, [log]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    setInterviews(await getUserInterviewsByUserIdAsync(loggedInUser.id));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: name === 'interviewId' ? Number(value) : value // Convert interviewId to number
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      label: checked
        ? [...prevFormData.label, name]
        : prevFormData.label.filter((label) => label !== name)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (formData.label.length === 0) {
      showSnackbar('Please select at least one label', 'error');
      setIsSubmitting(false);
    } else {
      try {
        if (isEditing) {
          await updateLogByIdAsync(log.id, formData);
          await fetchLogbookData();

          showSnackbar('Successfully updated log', 'success');
        } else {
          console.log(formData);
          await createLogAsync(loggedInUser.logbookId, formData);
          await fetchLogbookData();

          showSnackbar('Successfully created log', 'success');
        }
        // Wait for the Snackbar to finish closing before closing the modal
        setTimeout(() => {
          closeModal();
        }, 3000); // Match the Snackbar display duration
      } catch (error) {
        console.error('Error creating log:', error);
        showSnackbar('An error occurred. Please try again.', 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="log-form-modal-container">
      <div className="log-form-content-container">
        <form onSubmit={handleSubmit}>
          <div className="log-form-group">
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

          <div className="log-form-group">
            <label htmlFor="content">Content*</label>
            <input
              type="text"
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className="log-form-group">
            <label htmlFor="interviewId">Interview*</label>
            <select
              id="interviewId"
              name="interviewId"
              value={formData.interviewId}
              onChange={handleChange}
              required
              disabled={interviews.length === 0}
            >
              {interviews.length === 0 ? (
                <option value="">Loading...</option>
              ) : (
                <>
                  <option value="">Select an interview</option>
                  {interviews.map((interview) => (
                    <option key={interview.id} value={interview.id}>
                      {interview.title} at {interview.companyName}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          <div className="log-form-group">
            <label>Labels*</label>
            <div className="checkbox-group">
              {logLabels.map((label) => (
                <div key={label} className="checkbox-label-pill-container">
                  <input
                    type="checkbox"
                    id={label}
                    name={label}
                    checked={formData.label.includes(label)}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={label} className={`label-pill ${label.toLowerCase()}`}>
                    {label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="interview-form-submit-button">
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

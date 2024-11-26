/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useModal from '../../hooks/useModal';
import { logLabels } from '../../service/constants';
import './style.css';
import { getUserInterviewsAsync } from '../../service/apiClient';
import useSnackbar from '../../hooks/useSnackbar';
import Snackbar from '../snackbar';

export default function LogFormModal({ log, isEditing }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    interviewId: '',
    labels: []
  });
  const { closeModal } = useModal();
  const [interviews, setInterviews] = useState([]);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (log) {
      setFormData({
        title: log.title,
        content: log.content,
        interviewId: log.interviewId,
        labels: log.labels
      });
    }
  }, [log]);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    setInterviews(await getUserInterviewsAsync());
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
      labels: checked
        ? [...prevFormData.labels, name]
        : prevFormData.labels.filter((label) => label !== name)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.labels.length === 0) {
      showSnackbar('Please select at least one label', 'error');
    } else {
      if (isEditing) {
        console.log('Update log');
      } else {
        console.log('Create log');
        console.log(formData);
      }

      showSnackbar('Successfully created log', 'success');

      // Wait for the Snackbar to finish closing before closing the modal
      setTimeout(() => {
        closeModal();
      }, 3000); // Match the Snackbar display duration
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
            <label>Labels</label>
            <div className="checkbox-group">
              {logLabels.map((label) => (
                <div key={label}>
                  <input
                    type="checkbox"
                    id={label}
                    name={label}
                    checked={formData.labels.includes(label)}
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
            {isEditing ? 'Update' : 'Create'}
          </button>
        </form>
      </div>

      {snackbar.isOpen && (
        <Snackbar message={snackbar.message} type={snackbar.type} onClose={closeSnackbar} />
      )}
    </div>
  );
}

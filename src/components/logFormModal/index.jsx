/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import useModal from '../../hooks/useModal';
import './style.css';

export default function LogFormModal({ log, isEditing }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    interviewId: '',
    labels: []
  });
  const { closeModal } = useModal();
  const logLabels = [
    'Technical',
    'SoftSkill',
    'Behavioral',
    'Managerial',
    'Coding',
    'Design',
    'Testing',
    'Documentation',
    'Research',
    'Presentation'
  ];
  // const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    console.log(formData.labels);

    setFormData((prev) => {
      if (checked) {
        return { ...prev, labels: [...prev.labels, name] };
      } else {
        return { ...prev, labels: prev.labels.filter((label) => label !== name) };
      }
    });
  };

  // TODO: Notification pop up
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      console.log('Update log');
    } else {
      console.log('Create log');
    }

    // Wait for the Snackbar to finish closing before closing the modal
    setTimeout(() => {
      closeModal();
    }, 3000); // Match the Snackbar display duration
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
                  <label htmlFor={label}>{label}</label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="interview-form-submit-button">
            {isEditing ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}

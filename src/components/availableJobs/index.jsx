// components/AvailableJobs/index.jsx
/* eslint react/prop-types: 0 */
import './style.css';

export default function AvailableJobs({ jobs, onApply, onDismiss }) {
  return (
    <div className="available-jobs">
      <div className="jobs-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-box">
            <h3 className="job-title">{job.title}</h3>
            <p className="job-location">
              <strong>Location:</strong> {job.location}
            </p>
            <p className="job-company">
              <strong>Company:</strong> {job.company}
            </p>
            <p className="job-positions">
              <strong>Positions:</strong> {job.positions || 'Multiple'}
            </p>
            <p className="job-date">
              <strong>Posted on:</strong> {job.date || 'N/A'}
            </p>
            <div className="job-actions">
              <button className="apply-button" onClick={() => onApply(job.id)}>
                Apply
              </button>
              <button className="dismiss-button" onClick={() => onDismiss(job.id)}>
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

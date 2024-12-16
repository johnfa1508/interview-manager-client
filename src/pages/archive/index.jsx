import { useEffect, useState } from 'react';
import Header from '../../components/headerComponents/header';
import NavBar from '../../components/navComponents/navigation';
import {
  getArchivedUserInterviewsByUserIdAsync,
  unArchiveUserInterviewByIdAsync,
  deleteUserInterviewAsync
} from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';
import useSnackbar from '../../hooks/useSnackbar';
import Snackbar from '../../components/common/snackbar';
import './style.css';

export default function Archive() {
  const [interviews, setInterviews] = useState([]);
  const { loggedInUser } = useAuth();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchData() {
      const data = await getArchivedUserInterviewsByUserIdAsync(loggedInUser.id);
      setInterviews(data);
    }
    fetchData();
  }, [loggedInUser.id]);

  const handleDelete = async (interviewId) => {
    try {
      await deleteUserInterviewAsync(interviewId);
      setInterviews((prevInterviews) =>
        prevInterviews.filter((interview) => interview.id !== interviewId)
      );

      showSnackbar('Interview deleted successfully.', 'success');
    } catch (error) {
      console.error('Failed to delete interview:', error);
      showSnackbar('Failed to delete interview.', 'error');
    }
  };

  const handleUnarchive = async (interviewId) => {
    try {
      await unArchiveUserInterviewByIdAsync(interviewId);
      setInterviews((prevInterviews) =>
        prevInterviews.filter((interview) => interview.id !== interviewId)
      );

      showSnackbar('Interview unarchived successfully.', 'success');
    } catch (error) {
      console.error('Failed to unarchive interview:', error);
      showSnackbar('Failed to unarchive interview.', 'error');
    }
  };

  return (
    <div className="dashboard-layout">
      <Header />
      <NavBar />
      <div className="dashboard-content">
        <h1>Archive</h1>
        <div className="archive">
          <table className="archive-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {interviews.map((interview, index) => (
                <tr key={index}>
                  <td>{interview.description}</td>
                  <td>{interview.status}</td>
                  <td>
                    <button className="unarchive" onClick={() => handleUnarchive(interview.id)}>
                      Unarchive
                    </button>

                    <button className="delete" onClick={() => handleDelete(interview.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {snackbar.isOpen && (
        <Snackbar message={snackbar.message} type={snackbar.type} onClose={closeSnackbar} />
      )}
    </div>
  );
}

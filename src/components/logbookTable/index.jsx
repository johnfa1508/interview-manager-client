/* eslint-disable react/prop-types */
import useModal from '../../hooks/useModal';
import LogFormModal from '../logFormModal';
import { FaTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { deleteLogByIdAsync } from '../../service/apiClient';
import Snackbar from '../snackbar';
import useSnackbar from '../../hooks/useSnackbar';
import './style.css';

export default function LogbookTable({ logbookData, filteredLogs, fetchLogbookData }) {
  const { openModal, setModal } = useModal();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const showModal = (log) => {
    setModal(
      'Update log',
      <LogFormModal log={log} isEditing={true} fetchLogbookData={fetchLogbookData} />
    );

    openModal();
  };

  // NEVER REACHES SNACKBAR
  const handleDelete = async (logId) => {
    showSnackbar('Log deleted successfully', 'success');

    await deleteLogByIdAsync(logId);
    await fetchLogbookData();
  };

  if (!logbookData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div key={logbookData.id} className="logbook">
        <h2>{logbookData?.title}</h2>

        {filteredLogs.length > 0 ? (
          <table className="logbook-table">
            <thead>
              <tr>
                <th>Log Title</th>
                <th>Content</th>
                <th>Labels</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.title}</td>

                  <td>{log.content}</td>

                  <td className="label-column">
                    {log.label.map((label, index) => (
                      <span key={index} className={`label-pill ${label.toLowerCase()}`}>
                        {label}
                      </span>
                    ))}
                  </td>

                  <td className="logbook-action-columns">
                    <FaEdit className="logbook-action-icon" onClick={() => showModal(log)} />

                    <FaTrashAlt
                      className="logbook-action-icon"
                      onClick={() => handleDelete(log.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No logs found...</p>
        )}
      </div>

      {snackbar.isOpen && (
        <Snackbar message={snackbar.message} type={snackbar.type} onClose={closeSnackbar} />
      )}
    </div>
  );
}

/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { CiCircleMore } from 'react-icons/ci';
import { Droppable } from '../droppable';
import { Draggable } from '../draggable';
import { formatDateTime } from '../../service/formatDate';
import useModal from '../../hooks/useModal';
import ViewInterviewModal from '../ViewInterviewModal';
import './style.css';
import InterviewFormModal from '../InterviewFormModal';
import { archiveUserInterviewByIdAsync, deleteUserInterviewAsync } from '../../service/apiClient';
import useSnackbar from '../../hooks/useSnackbar';
import Snackbar from '../snackbar';
import { MdOutlineSchedule } from 'react-icons/md';
import { VscFeedback } from 'react-icons/vsc';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineCancelScheduleSend } from 'react-icons/md';

export default function InterviewColumn({
  id,
  interviews,
  setInterviews,
  interviewContainer,
  searchValue,
  fetchInterviews
}) {
  const { openModal, setModal } = useModal();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRefs = useRef([]);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleClickOutside = (event) => {
    const isClickInside = dropdownRefs.current.some((ref) => ref && ref.contains(event.target));
    if (!isClickInside) {
      setDropdownOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEdit = (interview, event) => {
    event.stopPropagation();
    setDropdownOpen(null);

    setModal(
      'Edit Interview',
      <InterviewFormModal
        interview={interview}
        isEditing={true}
        fetchInterviews={fetchInterviews}
      />
    );

    openModal();
  };

  const handleDelete = async (interview, event) => {
    event.stopPropagation();
    setDropdownOpen(null);

    await deleteUserInterviewAsync(interview.id);
    setInterviews((prevInterviews) => prevInterviews.filter((i) => i.id !== interview.id));
    showSnackbar('Interview deleted successfully', 'success');
  };

  const handleArchive = async (interview, event) => {
    event.stopPropagation();
    setDropdownOpen(null);

    await archiveUserInterviewByIdAsync(interview.id);
    fetchInterviews();
    showSnackbar('Interview archived successfully!', 'success');
  };

  const showInterviewModal = (interview) => {
    setModal(interview.title, <ViewInterviewModal interview={interview} />);
    openModal();
  };

  const getIconForColumnHeader = (columnName) => {
    switch (columnName) {
      case 'AwaitingFeedback':
        return <VscFeedback className="dashboard-column-header-icon awaiting" />;

      case 'Scheduled':
        return <MdOutlineSchedule className="dashboard-column-header-icon scheduled" />;

      case 'Canceled':
        return <MdOutlineCancelScheduleSend className="dashboard-column-header-icon canceled" />;

      case 'Completed':
        return <IoIosCheckmarkCircleOutline className="dashboard-column-header-icon completed" />;

      default:
        return null;
    }
  };

  return (
    <div className="column">
      <h3 className="dashboard-column-header">
        {getIconForColumnHeader(id)} {id} ({interviewContainer[id].length})
      </h3>

      <Droppable id={id}>
        {interviewContainer[id].map((itemId, index) => {
          const interview = interviews.find((interview) => interview.id === itemId);

          return (
            <Draggable key={itemId} id={itemId} index={index}>
              <div className="draggable-item">
                <div
                  className="decision-container"
                  ref={(el) => (dropdownRefs.current[index] = el)}
                >
                  <CiCircleMore className="decision-icon" onClick={() => toggleDropdown(index)} />

                  {/* Dropdown decision menu */}
                  {dropdownOpen === index && (
                    <ul className="interview-column-dropdown-menu">
                      <li onClick={(e) => handleEdit(interview, e)}>Edit</li>
                      <li onClick={(e) => handleDelete(interview, e)}>Delete</li>
                      <li onClick={(e) => handleArchive(interview, e)}>Archive</li>
                      <li onClick={() => setDropdownOpen(null)}>Close</li>
                    </ul>
                  )}
                </div>

                <h4 className="draggable-title" onClick={() => showInterviewModal(interview)}>
                  {interview?.title}
                </h4>

                <p>{formatDateTime(interview?.time)}</p>
              </div>
            </Draggable>
          );
        })}

        {searchValue !== '' && interviewContainer[id].length === 0 && <p>No results found</p>}
        {interviewContainer[id].length === 0 && searchValue === '' && <p>Drop here</p>}
      </Droppable>

      {snackbar.isOpen && (
        <Snackbar message={snackbar.message} type={snackbar.type} onClose={closeSnackbar} />
      )}
    </div>
  );
}

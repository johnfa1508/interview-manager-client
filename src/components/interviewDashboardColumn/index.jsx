/* eslint-disable react/prop-types */
import { CiCircleMore } from 'react-icons/ci';
import { Droppable } from '../droppable';
import { Draggable } from '../draggable';
import { formatDateTime } from '../../service/formatDate';
import useModal from '../../hooks/useModal';
import usePositionedModal from '../../hooks/usePositionedModal';
import DecisionModal from '../decisionModal';
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
  const {
    openModal: openCenteredModal,
    // closeModal: closeCenteredModal,
    setModal: setCenteredModal
  } = useModal();
  const { openModal: openPositionedModal, closeModal: closePositionedModal } = usePositionedModal();
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const filteredInterviews = interviewContainer[id].filter((itemId) =>
    interviews.some((interview) => interview.id === itemId)
  );

  const handleEdit = (interview) => {
    console.log('Edit:', interview);
    closePositionedModal();

    setCenteredModal(
      'Edit interview',
      <InterviewFormModal
        interview={interview}
        isEditing={true}
        fetchInterviews={fetchInterviews}
      />
    );

    openCenteredModal();
  };

  const handleDelete = (interview) => {
    console.log('Delete:', interview);
    deleteUserInterviewAsync(interview.id);
    setInterviews((prevInterviews) => prevInterviews.filter((i) => i.id !== interview.id));
    closePositionedModal();

    showSnackbar('Interview deleted successfully!', 'success');
  };

  const handleArchive = async (interview) => {
    console.log('Archive:', interview);
    await archiveUserInterviewByIdAsync(interview.id);
    fetchInterviews();
    closePositionedModal();

    showSnackbar('Interview archived successfully!', 'success');
  };

  const showDecisionModal = (interview, event) => {
    const rect = event.target.getBoundingClientRect();
    const position = {
      top: rect.top - 35,
      left: rect.left + rect.width - 35
    };

    openPositionedModal(
      <DecisionModal
        onEdit={() => handleEdit(interview)}
        onDelete={() => handleDelete(interview)}
        onArchive={() => handleArchive(interview)}
        closeModal={closePositionedModal}
        position={position}
      />
    );
  };

  const showInterviewModal = (interview) => {
    setCenteredModal(interview.title, <ViewInterviewModal interview={interview} />);

    openCenteredModal();
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
        {getIconForColumnHeader(id)} {id} ({filteredInterviews.length})
      </h3>

      <Droppable id={id}>
        {filteredInterviews.map((itemId, index) => {
          const interview = interviews.find((interview) => interview.id === itemId);

          return (
            <Draggable key={itemId} id={itemId} index={index}>
              <div
                className="decision-container"
                onClick={(event) => showDecisionModal(interview, event)}
              >
                <CiCircleMore className="decision-icon" />
              </div>
              <h4 className="draggable-title" onClick={() => showInterviewModal(interview)}>
                {interview.title}
              </h4>
              <p>{formatDateTime(interview.time)}</p>
            </Draggable>
          );
        })}

        {searchValue !== '' && filteredInterviews.length === 0 && <p>No results found</p>}
        {filteredInterviews.length === 0 && searchValue === '' && <p>Drop here</p>}
      </Droppable>

      {snackbar.isOpen && (
        <Snackbar message={snackbar.message} type={snackbar.type} onClose={closeSnackbar} />
      )}
    </div>
  );
}

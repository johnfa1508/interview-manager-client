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
import { deleteUserInterviewAsync } from '../../service/apiClient';

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
  };

  const handleArchive = (interview) => {
    console.log('Archive:', interview);
    closePositionedModal();
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
    setCenteredModal(<ViewInterviewModal interview={interview} />);
    openCenteredModal();
  };

  return (
    <div className="column">
      <h3>{id}</h3>
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
    </div>
  );
}

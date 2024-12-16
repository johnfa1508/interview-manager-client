import { useEffect, useState } from 'react';
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import InterviewColumn from '../interviewDashboardColumn';
import Searchbar from '../../common/searchbar';
import {
  getSourceContainer,
  moveDraggable,
  moveDraggableBackToAwaiting
} from '../../../service/dragUtils';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import useModal from '../../../hooks/useModal';
import InterviewFormModal from '../InterviewFormModal';
import './style.css';
import {
  getUserInterviewsByUserIdAsync,
  updateUserInterviewStatusAsync
} from '../../../service/apiClient';
import useAuth from '../../../hooks/useAuth';

export default function InterviewDashboard() {
  const containers = ['AwaitingFeedback', 'Scheduled', 'Canceled', 'Completed'];
  const [interviews, setInterviews] = useState([]);
  const [interviewContainer, setInterviewContainer] = useState({
    AwaitingFeedback: [],
    Scheduled: [],
    Canceled: [],
    Completed: []
  });
  const [searchValue, setSearchValue] = useState('');
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  );
  const { openModal, setModal } = useModal();
  const { loggedInUser } = useAuth();

  const showModal = () => {
    setModal(
      'Create an interview',
      <InterviewFormModal isEditing={false} fetchInterviews={fetchInterviews} />
    );

    openModal();
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const searchFilteredInterviews = interviews.filter((interview) =>
    interview.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const fetchInterviews = async () => {
    try {
      const data = await getUserInterviewsByUserIdAsync(loggedInUser.id);
      const filteredData = data.filter((interview) => !interview.isArchived);

      setInterviews(filteredData);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  useEffect(() => {
    console.log(interviews);
  }, [interviews]);

  useEffect(() => {
    // Filter interviews based on status
    setInterviewContainer({
      AwaitingFeedback: interviews
        .filter((interview) => interview.status === 'AwaitingFeedback')
        .map((interview) => interview.id),

      Scheduled: interviews
        .filter((interview) => interview.status === 'Scheduled')
        .map((interview) => interview.id),

      Canceled: interviews
        .filter((interview) => interview.status === 'Canceled')
        .map((interview) => interview.id),

      Completed: interviews
        .filter((interview) => interview.status === 'Completed')
        .map((interview) => interview.id)
    });
  }, [interviews]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setInterviewContainer((prevItems) => {
      // Where Draggable-container is dragged from
      const sourceContainer = getSourceContainer(prevItems, active.id);

      if (over) {
        // Where Draggable-container is being hovered over
        const destinationContainer = over.id;

        // If Draggable-container is dropped in the same container
        if (sourceContainer === destinationContainer) {
          return prevItems;
        }

        // If Draggable-container is dropped in a different container
        console.log(`Moved ${active.id} from ${sourceContainer} to ${destinationContainer}`);
        updateUserInterviewStatusAsync(active.id, destinationContainer);

        return moveDraggable(prevItems, active.id, sourceContainer, destinationContainer);
      } else {
        // If Draggable-container is dropped outside of any Droppable-containers
        if (!prevItems.AwaitingFeedback.includes(active.id)) {
          console.log(`Moved ${active.id} from ${sourceContainer} back to AwaitingFeedback`);
          updateUserInterviewStatusAsync(active.id, 'AwaitingFeedback');

          return moveDraggableBackToAwaiting(prevItems, active.id, sourceContainer);
        } else {
          return prevItems;
        }
      }
    });
  };

  return (
    <div>
      <div className="container-above-interview">
        <Searchbar
          searchValue={searchValue}
          handleChange={handleSearchChange}
          placeholder="Search for an interview..."
        />
        <MdOutlineAddCircleOutline className="add-interview-icon" onClick={showModal} />
      </div>

      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <div className="dashboard-container">
          {containers.map((id) => (
            <InterviewColumn
              key={id}
              id={id}
              interviews={searchFilteredInterviews}
              interviewContainer={interviewContainer}
              searchValue={searchValue}
              setInterviews={setInterviews}
              fetchInterviews={fetchInterviews}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

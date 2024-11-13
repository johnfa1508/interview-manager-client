import { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import InterviewColumn from '../interviewDashboardColumn';
import Searchbar from '../searchbar';
import {
  getSourceContainer,
  moveDraggable,
  moveDraggableBackToAwaiting
} from '../../service/dragUtils';
import { interviewsMockData } from '../../service/mockData';
import './style.css';

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

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const searchFilteredInterviews = interviews.filter((interview) =>
    interview.Job_title.toLowerCase().includes(searchValue.toLowerCase())
  );

  // TODO: Connect to backend-API to fetch interviews
  useEffect(() => {
    setInterviews(interviewsMockData);
  }, []);

  useEffect(() => {
    // Filter interviews based on status
    setInterviewContainer({
      AwaitingFeedback: interviews
        .filter((interview) => interview.status === 'AwaitingFeedback')
        .map((interview) => interview.InterviewId),

      Scheduled: interviews
        .filter((interview) => interview.status === 'Scheduled')
        .map((interview) => interview.InterviewId),

      Canceled: interviews
        .filter((interview) => interview.status === 'Canceled')
        .map((interview) => interview.InterviewId),

      Completed: interviews
        .filter((interview) => interview.status === 'Completed')
        .map((interview) => interview.InterviewId)
    });
  }, [interviews]);

  function handleDragEnd(event) {
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
        return moveDraggable(prevItems, active.id, sourceContainer, destinationContainer);
      } else {
        // If Draggable-container is dropped outside of any Droppable-containers
        if (!prevItems.AwaitingFeedback.includes(active.id)) {
          console.log(`Moved ${active.id} from ${sourceContainer} back to AwaitingFeedback`);
          return moveDraggableBackToAwaiting(prevItems, active.id, sourceContainer);
        } else {
          return prevItems;
        }
      }
    });
  }

  return (
    <div>
      <Searchbar searchValue={searchValue} handleChange={handleSearchChange} />
      <DndContext onDragEnd={handleDragEnd}>
        <div className="container">
          {containers.map((id) => (
            <InterviewColumn
              key={id}
              id={id}
              interviews={searchFilteredInterviews}
              interviewContainer={interviewContainer}
              searchValue={searchValue}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

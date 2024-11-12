import { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from '../droppable';
import { Draggable } from '../draggable';
import { formatDateTime } from '../../service/formatDate';
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
      {/* TODO: Make search bar component and logic */}
      <h1>Search bar here</h1>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="container">
          {containers.map((id) => (
            <div key={id} className="column">
              <h3>{id}</h3>
              <Droppable id={id}>
                {interviewContainer[id].map((itemId, index) => {
                  const interview = interviews.find(
                    (interview) => interview.InterviewId === itemId
                  );

                  return (
                    <Draggable key={itemId} id={itemId} index={index}>
                      <div>
                        <h4>{interview.Job_title}</h4>
                        <p>{formatDateTime(interview.Time)}</p>
                      </div>
                    </Draggable>
                  );
                })}

                {/* If Droppable-container is empty */}
                {interviewContainer[id].length === 0 && <p>Drop here</p>}
              </Droppable>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { Droppable } from '../droppable';
import { Draggable } from '../draggable';
import { formatDateTime } from '../../utils/formatDate';

const mockInterviews = [
  {
    InterviewId: '1',
    Job_title: 'Software Engineer',
    Time: '2023-10-01T10:00:00Z',
    Address: '123 Main St, City, Country',
    Description: 'Interview for the position of Software Engineer.',
    Duration_In_Minutes: 60,
    status: 'AwaitingFeedback'
  },
  {
    InterviewId: '2',
    Job_title: 'Product Manager',
    Time: '2023-10-02T14:00:00Z',
    Address: '456 Elm St, City, Country',
    Description: 'Interview for the position of Product Manager.',
    Duration_In_Minutes: 45,
    status: 'Scheduled'
  },
  {
    InterviewId: '3',
    Job_title: 'Data Scientist',
    Time: '2023-10-03T09:00:00Z',
    Address: '789 Oak St, City, Country',
    Description: 'Interview for the position of Data Scientist.',
    Duration_In_Minutes: 90,
    status: 'Canceled'
  },
  {
    InterviewId: '4',
    Job_title: 'UX Designer',
    Time: '2023-10-04T11:00:00Z',
    Address: '101 Pine St, City, Country',
    Description: 'Interview for the position of UX Designer.',
    Duration_In_Minutes: 60,
    status: 'Completed'
  },
  {
    InterviewId: '5',
    Job_title: 'DevOps Engineer',
    Time: '2023-10-05T15:00:00Z',
    Address: '202 Maple St, City, Country',
    Description: 'Interview for the position of DevOps Engineer.',
    Duration_In_Minutes: 75,
    status: 'AwaitingFeedback'
  }
];

export default function InterviewDashboard() {
  const containers = ['AwaitingFeedback', 'Scheduled', 'Canceled', 'Completed'];
  const [interviews, setInterviews] = useState([]);
  const [interviewContainer, setInterviewContainer] = useState({
    AwaitingFeedback: [],
    Scheduled: [],
    Canceled: [],
    Completed: []
  });

  useEffect(() => {
    setInterviews(mockInterviews);
  }, []);

  useEffect(() => {
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
      const sourceContainer = prevItems.AwaitingFeedback.includes(active.id)
        ? 'AwaitingFeedback'
        : Object.keys(prevItems).find((key) => prevItems[key].includes(active.id));

      if (over) {
        const destinationContainer = over.id;

        if (sourceContainer === destinationContainer) {
          return prevItems;
        }

        console.log(`Moved ${active.id} from ${sourceContainer} to ${destinationContainer}`);

        return {
          ...prevItems,
          [sourceContainer]: prevItems[sourceContainer].filter((id) => id !== active.id),
          [destinationContainer]: [...prevItems[destinationContainer], active.id]
        };
      } else {
        if (!prevItems.AwaitingFeedback.includes(active.id)) {
          console.log(`Moved ${active.id} from ${sourceContainer} back to unlisted`);

          return {
            ...prevItems,
            [sourceContainer]: prevItems[sourceContainer].filter((id) => id !== active.id),
            AwaitingFeedback: [...prevItems.AwaitingFeedback, active.id]
          };
        } else {
          return prevItems;
        }
      }
    });
  }

  return (
    <div>
      <h1>Search bar here</h1>
      <h2>Interviews here</h2>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="container">
          {containers.map((id) => (
            <div key={id} className="column">
              <h3>{id}</h3>
              <Droppable id={id}>
                {interviewContainer[id].map((itemId, index) => {
                  const interview = mockInterviews.find(
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

                {interviewContainer[id].length === 0 && <p>Drop here</p>}
              </Droppable>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
}

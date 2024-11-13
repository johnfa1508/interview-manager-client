/* eslint-disable react/prop-types */
import { Droppable } from '../droppable';
import { Draggable } from '../draggable';
import { formatDateTime } from '../../service/formatDate';
import './style.css';

export default function InterviewColumn({ id, interviews, interviewContainer, searchValue }) {
  const filteredInterviews = interviewContainer[id].filter((itemId) =>
    interviews.some((interview) => interview.InterviewId === itemId)
  );

  return (
    <div className="column">
      <h3>{id}</h3>
      <Droppable id={id}>
        {filteredInterviews.map((itemId, index) => {
          const interview = interviews.find((interview) => interview.InterviewId === itemId);

          return (
            <Draggable key={itemId} id={itemId} index={index}>
              <div>
                <h4>{interview.Job_title}</h4>
                <p>{formatDateTime(interview.Time)}</p>
              </div>
            </Draggable>
          );
        })}

        {searchValue !== '' && filteredInterviews.length === 0 && <p>No results found</p>}
        {filteredInterviews.length === 0 && searchValue === '' && <p>Drop here</p>}
      </Droppable>
    </div>
  );
}

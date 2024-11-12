/* eslint-disable react/prop-types */
import { useDroppable } from '@dnd-kit/core';
import './style.css';

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id
  });
  const style = {
    border: isOver ? '2px dashed green' : '2px dashed grey',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: isOver ? '#061B23' : '#061B23',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '400px'
  };

  return (
    <div ref={setNodeRef} style={style} className={isOver ? 'droppable is-over' : 'droppable'}>
      {props.children}
    </div>
  );
}
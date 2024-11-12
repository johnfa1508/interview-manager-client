/* eslint-disable react/prop-types */
import { useDraggable } from '@dnd-kit/core';
import './style.css';

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        margin: '10px 0',
        padding: '10px',
        border: '1px solid gray',
        borderRadius: '4px',
        cursor: 'grab'
      }
    : {
        margin: '10px 0',
        padding: '10px',
        border: '1px solid gray',
        borderRadius: '4px',
        cursor: 'grab'
      };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="draggable">
      {props.children}
    </div>
  );
}

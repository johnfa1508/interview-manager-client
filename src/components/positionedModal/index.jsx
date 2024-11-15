import './style.css';
import style from './style';
import usePositionedModal from '../../hooks/usePositionedModal';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

const PositionedModal = () => {
  const { isOpen, closeModal, modalComponent } = usePositionedModal();

  return (
    // TODO: Find a way to make the ReactModal container match the component so you can click outside the modal to close it
    <ReactModal isOpen={isOpen} onRequestClose={closeModal} style={style}>
      <div className="positioned-modal">
        <div className="positioned-modal-content">{modalComponent}</div>
      </div>
    </ReactModal>
  );
};

export default PositionedModal;

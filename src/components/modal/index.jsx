/* eslint-disable react/prop-types */
import ReactModal from 'react-modal';
import useModal from '../../hooks/useModal';
import style from './style.jsx';
import './style.css';

ReactModal.setAppElement('#root');

const Modal = ({ width = '612px' }) => {
  const { isOpen, closeModal, modalComponent, modalHeader } = useModal();

  style.content.width = width;

  return (
    <ReactModal isOpen={isOpen} onRequestClose={closeModal} style={style}>
      <div className="modal-body">
        <section className="modal-header border-bottom">
          <h2>{modalHeader}</h2>
          <p onClick={closeModal}>X</p>
        </section>

        <section className="modal-content">{modalComponent}</section>
      </div>
    </ReactModal>
  );
};

export default Modal;

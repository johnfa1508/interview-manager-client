import { useContext } from 'react';
import { PositionedModalContext } from '../context/positionedModal';

const usePositionedModal = () => {
  return useContext(PositionedModalContext);
};

export default usePositionedModal;

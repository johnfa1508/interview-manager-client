import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ModalProvider } from './context/modal.jsx';
import { PositionedModalProvider } from './context/positionedModal.jsx';
import Modal from './components/modal/index.jsx';
import PositionedModal from './components/positionedModal/index.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <PositionedModalProvider>
          <App />
          <Modal />
          <PositionedModal />
        </PositionedModalProvider>
      </ModalProvider>
    </BrowserRouter>
  </StrictMode>
);

import './App.css';
import ViewInterviewModal from './components/ViewInterviewModal';
//import ModalTesting from './components/testing/ModalTest';
import useModal from './hooks/useModal';

function App() {
  const { openModal, setModal } = useModal();
  const showModal = () => {
    // This function will be implemented in the next step
    setModal(<ViewInterviewModal/>);
    //setModal(<ModalTesting/>);

    openModal();
  };

  return (
    <>
      <h1>Interview Manager</h1>
      <button onClick={showModal}>Test modal</button>
    </>
  );
}

export default App;

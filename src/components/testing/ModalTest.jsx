import { useState } from 'react';
import useModal from '../../hooks/useModal';
import './style.css';

const ModalTesting = () => {
  // Use the useModal hook to get the closeModal function so we can close the modal on user interaction
  const { closeModal } = useModal();

  const [message, setMessage] = useState(null);
  const [text, setText] = useState('');
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async () => {
    setMessage('Submit button was clicked! Closing modal in 1 seconds...');
    setTimeout(() => {
      setMessage(null);
      closeModal();
    }, 1000);
  };

  return (
    <>
      <section>
        <textarea onChange={onChange} value={text} placeholder="What's on your mind?"></textarea>
      </section>

      <section className="create-post-actions">
        <button
          onClick={onSubmit}
          className={`${text.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!text.length}
        >
          Post
        </button>
      </section>

      {message && <p>{message}</p>}
    </>
  );
};

export default ModalTesting;

/* eslint-disable react/prop-types */
import Steps from './steps';
import './style.css';
import { useState } from 'react';
import useSnackbar from '../../hooks/useSnackbar';
import Snackbar from '../Snackbar';

const Stepper = ({ header, children, onComplete, stepIsValid }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar();

  const onBackClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onNextClick = () => {
    if (stepIsValid) {
      if (currentStep === children.length - 1) {
        onComplete();
        return;
      }

      setCurrentStep(currentStep + 1);
    } else {
      // setShowErrorText(true);
      showSnackbar('Please fill out all required fields', 'error');
    }
  };

  return (
    <div>
      {header}
      <div className="steps-container">
        <Steps maxSteps={children.length} currentStep={currentStep} />
      </div>

      {children[currentStep]}

      <div className="stepper-buttons">
        {currentStep > 0 && (
          <button className="offwhite" onClick={onBackClick}>
            Back
          </button>
        )}

        <button onClick={onNextClick} className="blue nextButton">
          {currentStep === children.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>

      {snackbar.isOpen && (
        <Snackbar message={snackbar.message} type={snackbar.type} onClose={closeSnackbar} />
      )}
    </div>
  );
};

export default Stepper;

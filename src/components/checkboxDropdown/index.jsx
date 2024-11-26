/* eslint-disable react/prop-types */
import { useState } from 'react';
import './style.css';

export default function CheckboxDropdown({ options, selectedOptions, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      onChange([...selectedOptions, value]);
    } else {
      onChange(selectedOptions.filter((option) => option !== value));
    }
  };

  return (
    <div className="dropdown-container">
      <button type="button" className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        Select Labels
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <label key={option} className="dropdown-item">
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions.includes(option)}
                onChange={handleCheckboxChange}
              />
              <span className={`label-pill ${option.toLowerCase()}`}>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

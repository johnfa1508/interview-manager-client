/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import './style.css';

export default function CheckboxDropdown({ options, selectedOptions, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      onChange([...selectedOptions, value]);
    } else {
      onChange(selectedOptions.filter((option) => option !== value));
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button type="button" className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        Filter by labels
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

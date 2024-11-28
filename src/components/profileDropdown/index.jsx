/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../ProfileImage';
import './style.css';

export default function ProfileDropdown({ image, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="profile-dropdown-container">
      <button type="button" className="profile-dropdown-button" onClick={toggleDropdown}>
        <ProfileImage image={image} size="60px" />
      </button>

      {isOpen && (
        <div className="profile-dropdown-menu">
          <Link to="/profile" className="profile-dropdown-item">
            Profile
          </Link>

          <Link to="/profile" className="profile-dropdown-item" onClick={onLogout}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}

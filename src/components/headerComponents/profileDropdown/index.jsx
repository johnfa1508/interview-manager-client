/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ProfileImage from '../../common/ProfileImage';
import useAuth from '../../../hooks/useAuth';
import './style.css';

export default function ProfileDropdown({ image }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { onLogout } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
    <div className="profile-dropdown-container" ref={dropdownRef}>
      <button type="button" className="profile-dropdown-button" onClick={toggleDropdown}>
        <ProfileImage image={image} size="60px" />
      </button>

      {isOpen && (
        <div className="profile-dropdown-menu">
          <Link to="/profile" className="profile-dropdown-item">
            Profile
          </Link>

          <Link to="/login" className="profile-dropdown-item" onClick={onLogout}>
            Logout
          </Link>
        </div>
      )}
    </div>
  );
}

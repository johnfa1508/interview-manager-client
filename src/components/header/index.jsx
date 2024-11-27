import  { useState } from 'react';
import HeaderLogo from '../headerLogo';
import { Link } from 'react-router-dom';
import ProfileImage from '../ProfileImage';
import { getUserFromLocalStorage } from '../../context/userStorage';
import NotificationBox from '../notificationBox';
import './style.css';

export default function Header() {
  const userData = getUserFromLocalStorage();
  const [notifications, setNotifications] = useState([
    'Interview status for UserInterview ID 1 has changed to Scheduled.',
    'Interview status for UserInterview ID 2 has changed to Completed.',
    'Interview status for UserInterview ID 3 has changed to Cancelled.'
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    setUnreadCount(0); // Reset unread count when the bell is clicked
  };

  const handleRemoveNotification = (index) => {
    setNotifications((prevNotifications) => prevNotifications.filter((_, i) => i !== index));
  };

  return (
    <header>
      <HeaderLogo textColor={'#FFFFFF'} arrowColor={'#030311'} boxColor={'#20b2aa'} />

      <div className="dropdown-container">
        <div className="notification-bell" onClick={handleBellClick}>
          <i className="fas fa-bell"></i>
          {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
        </div>
        {showNotifications && (
          <div className="dropdown-menu">
            <NotificationBox notifications={notifications} onRemoveNotification={handleRemoveNotification} />
          </div>
        )}
      </div>

      <Link to="/profile" className="profile-link">
        <ProfileImage image={userData?.profileImage} size="60px" />
      </Link>
    </header>
  );
}
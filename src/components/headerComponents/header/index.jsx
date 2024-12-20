import { useState, useEffect, useRef } from 'react';
import HeaderLogo from '../headerLogo';
import NotificationBox from '../notificationBox';
import useAuth from '../../../hooks/useAuth';
import ProfileDropdown from '../profileDropdown';
import './style.css';
import * as signalR from '@microsoft/signalr';

export default function Header() {
  const { loggedInUser } = useAuth();
  const [notifications, setNotifications] = useState([
    'Interview status for UserInterview ID 1 has changed to Scheduled.',
    'Interview status for UserInterview ID 2 has changed to Completed.',
    'Interview status for UserInterview ID 3 has changed to Cancelled.'
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.length);
  const notificationRef = useRef(null);

  useEffect(() => {
    if (!loggedInUser) {
      console.error('User data is null');
      return;
    }

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7087/notificationHub?userId=${loggedInUser.userId}`, {
        accessTokenFactory: () => loggedInUser.token // Assuming you have a token for authentication
      })
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log('Connected to SignalR hub');
        connection.on('ReceiveNotification', (notification) => {
          setNotifications((prevNotifications) => [...prevNotifications, notification]);
          setUnreadCount((prevCount) => prevCount + 1);
        });
      })
      .catch((error) => console.error('SignalR Connection Error: ', error));

    return () => {
      connection.stop().then(() => console.log('Disconnected from SignalR hub'));
    };
  }, [loggedInUser]);

  const handleBellClick = () => {
    setShowNotifications(!showNotifications);
    setUnreadCount(0);
  };

  const handleRemoveNotification = (index) => {
    setNotifications((prevNotifications) => prevNotifications.filter((_, i) => i !== index));
  };

  const handleClickOutside = (event) => {
    if (notificationRef.current && !notificationRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <HeaderLogo
        textColor={'#FFFFFF'}
        arrowColor={'#030311'}
        boxColor={'#20b2aa'}
        className="header-logo"
      />

      <div className="notification-dropdown-container" ref={notificationRef}>
        <div className="notification-bell" onClick={handleBellClick}>
          <i className="fas fa-bell"></i>
          {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
        </div>
        {showNotifications && (
          <div className="notification-dropdown-menu">
            <NotificationBox
              notifications={notifications}
              onRemoveNotification={handleRemoveNotification}
            />
          </div>
        )}
      </div>

      <ProfileDropdown image={loggedInUser?.profileImage} />
    </header>
  );
}

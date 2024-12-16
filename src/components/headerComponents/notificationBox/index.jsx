/* eslint-disable react/prop-types */
import  { useEffect } from 'react';
import './style.css';

const NotificationBox = ({ notifications, onRemoveNotification }) => {
  useEffect(() => {
    console.log('Received notifications:', notifications);
  }, [notifications]);

  return (
    <div className="notification-box">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications</p>
      ) : (
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              {notification}
              <button className="remove-notification" onClick={() => onRemoveNotification(index)}>x</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationBox;
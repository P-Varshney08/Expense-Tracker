import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Notification = ({ message, positive, onDismiss }) => {
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss();
  };

  return (
    <div className={`p-4 mb-4 rounded-md shadow-md ${positive ? 'bg-green-100' : 'bg-red-100'} ${dismissed ? 'hidden' : 'block'}`}>
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">{message}</p>
        <button onClick={handleDismiss} className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'This is a positive notification.', positive: true },
    { id: 2, message: 'This is a negative notification.', positive: false },
    { id: 3, message: 'Another positive notification.', positive: true },
  ]);

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          positive={notification.positive}
          onDismiss={() => dismissNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export default NotificationsPage;

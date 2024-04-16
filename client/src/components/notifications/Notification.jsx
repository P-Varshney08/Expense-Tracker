import React, { useState, useEffect } from 'react';
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
  const location = useLocation();

  // State variable for notifications array
  const [notifications, setNotifications] = useState([]);

  // Effect to add message from location state to notifications array
  useEffect(() => {
    const message = location.state?.message;
    const positive = location.state?.positive;

    if (message) {
      const newNotification = {
        id: Date.now(), // Use a timestamp as a unique ID for the new notification
        message,
        positive: positive !== undefined ? positive : true, // Default to true if not specified
      };

      // Add the new notification to the notifications array
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
    }
  }, [location]);

  // Function to dismiss a notification
  const dismissNotification = (id) => {
    setNotifications((prevNotifications) => prevNotifications.filter(notification => notification.id !== id));
  };

  return (
    <div className="flex justify-center items-center min-h-[630px] bg-white">
      <div className="w-full max-w-lg p-8">
        <h1 className="text-2xl font-semibold mb-4 text-center">Notifications</h1>
        {notifications.length === 0 ? (
          <div className="flex justify-center items-center">
            <img src="https://img.freepik.com/premium-vector/alert-concept-illustration_86047-335.jpg?w=826" alt="Empty notifications" className="w-84 h-84" />
          </div>
        ) : (
          notifications.map(notification => (
            <Notification
              key={notification.id}
              message={notification.message}
              positive={notification.positive}
              onDismiss={() => dismissNotification(notification.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;

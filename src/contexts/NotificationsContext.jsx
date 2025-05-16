// contexts/NotificationsContext.jsx - Notifications Context Provider
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Notifications Context
const NotificationsContext = createContext();

// Custom hook for using the Notifications Context
export const useNotifications = () => useContext(NotificationsContext);

// Notifications Provider Component
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  // Initialize from localStorage on component mount
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);

  // Update localStorage when notifications change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Add a notification
  const addNotification = (notification) => {
    const newNotification = {
      id: notification.id || Date.now(),
      type: notification.type || 'info',
      message: notification.message,
      dismissed: false,
      timestamp: new Date().toISOString()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Dismiss a notification
  const dismissNotification = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, dismissed: true } 
          : notification
      )
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, dismissed: true }))
    );
  };

  // Get unread notifications
  const getUnreadNotifications = () => {
    return notifications.filter(notification => !notification.dismissed);
  };

  // Create a notifications value object to provide to consumers
  const value = {
    notifications,
    unreadCount: getUnreadNotifications().length,
    addNotification,
    dismissNotification,
    clearAllNotifications,
    getUnreadNotifications
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContext;
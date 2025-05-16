// components/Notifications/NotificationCenter.jsx - Notification Display Component
import React, { useState, useEffect, useRef } from 'react';
import { useNotifications } from '../../contexts/NotificationsContext';

const NotificationCenter = () => {
  const { notifications, unreadCount, dismissNotification, clearAllNotifications } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef();

  // Close notification panel when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + 
           date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <div className="flex items-center justify-center w-8 h-8 text-green-500 bg-green-100 rounded-full">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="flex items-center justify-center w-8 h-8 text-yellow-500 bg-yellow-100 rounded-full">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-full">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  // Get unread notifications
  const unreadNotifications = notifications.filter(n => !n.dismissed);

  return (
    <>
      {/* Notification Toggle Button (Mobile) */}
      <div className="fixed bottom-4 right-4 z-30 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full shadow-lg focus:outline-none"
          aria-label="Open notifications"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notification Panel */}
      {isOpen && (
        <div 
          ref={notificationRef}
          className="fixed top-16 right-0 z-30 w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-xl lg:top-16"
          role="dialog"
          aria-modal="true"
          aria-labelledby="notifications-title"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 id="notifications-title" className="text-lg font-semibold text-gray-900">Notifications</h3>
            {unreadNotifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear all
              </button>
            )}
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {unreadNotifications.length === 0 ? (
              <p className="text-center text-gray-500">No notifications</p>
            ) : (
              unreadNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start p-3 bg-gray-50 rounded-lg"
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 ml-3">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500">{formatDate(notification.timestamp)}</p>
                  </div>
                  <button
                    onClick={() => dismissNotification(notification.id)}
                    className="text-gray-400 hover:text-gray-600"
                    aria-label="Dismiss notification"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationCenter;
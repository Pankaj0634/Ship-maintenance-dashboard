// components/Layout/Navbar.jsx - Top Navigation Bar
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationsContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center flex-shrink-0">
              <button 
                onClick={toggleSidebar} 
                className="p-2 text-gray-600 rounded-md lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-label="Open sidebar"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link to="/dashboard" className="flex items-center ml-2 lg:ml-0">
                <span className="text-xl font-bold text-gray-900">ENTNT Ship Maintenance</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                to="/dashboard" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  window.location.pathname === '/dashboard' 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/ships" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  window.location.pathname.includes('/ships') 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ships
              </Link>
              <Link 
                to="/jobs" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  window.location.pathname === '/jobs' 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Jobs
              </Link>
              <Link 
                to="/calendar" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                  window.location.pathname === '/calendar' 
                    ? 'border-blue-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Calendar
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {/* Notification bell */}
            <div className="relative ml-3">
              <button 
                onClick={() => navigate('/notifications')}
                className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="View notifications"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"></span>
                )}
              </button>
            </div>
            
            {/* User menu */}
            <div className="relative ml-3">
              <div>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-expanded={showDropdown}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="p-2 text-gray-500 bg-gray-100 rounded-full">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {user?.email} <span className="text-xs text-gray-500">({user?.role})</span>
                  </span>
                </button>
              </div>
              
              {/* User dropdown menu */}
              {showDropdown && (
                <div 
                  className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
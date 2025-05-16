// components/Layout/Sidebar.jsx - Side Navigation Bar
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user } = useAuth();

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-600 opacity-75 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-800 lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        }`}
      >
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              ></path>
            </svg>
            <span className="mx-2 text-xl font-semibold text-white">Ship Maintenance</span>
          </div>
        </div>

        <nav className="mt-10">
          <Link 
            className={`flex items-center px-6 py-2 mt-4 ${
              window.location.pathname === '/dashboard' 
                ? 'text-gray-100 bg-gray-700 bg-opacity-25' 
                : 'text-gray-300 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
            }`}
            to="/dashboard"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <span className="mx-3">Dashboard</span>
          </Link>

          <Link 
            className={`flex items-center px-6 py-2 mt-4 ${
              window.location.pathname.includes('/ships') 
                ? 'text-gray-100 bg-gray-700 bg-opacity-25' 
                : 'text-gray-300 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
            }`}
            to="/ships"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <span className="mx-3">Ships</span>
          </Link>

          <Link 
            className={`flex items-center px-6 py-2 mt-4 ${
              window.location.pathname === '/jobs' 
                ? 'text-gray-100 bg-gray-700 bg-opacity-25' 
                : 'text-gray-300 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
            }`}
            to="/jobs"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span className="mx-3">Maintenance Jobs</span>
          </Link>

          <Link 
            className={`flex items-center px-6 py-2 mt-4 ${
              window.location.pathname === '/calendar' 
                ? 'text-gray-100 bg-gray-700 bg-opacity-25' 
                : 'text-gray-300 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100'
            }`}
            to="/calendar"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="mx-3">Calendar</span>
          </Link>
        </nav>

        {/* User information at bottom of sidebar */}
        <div className="absolute bottom-0 w-full">
          <div className="flex items-center px-6 py-4 text-gray-300">
            <div>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.email}</p>
              <p className="text-xs">Role: {user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
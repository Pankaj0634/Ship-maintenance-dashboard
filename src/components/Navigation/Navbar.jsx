import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/dashboard" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              Dashboard
            </Link>
            <Link to="/ships" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              Ships
            </Link>
            <Link to="/jobs" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              Jobs
            </Link>
            <Link to="/calendar" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              Calendar
            </Link>
          </div>
          <div className="flex items-center">
            <span className="text-gray-700 mr-4">{user?.email}</span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm text-red-600 hover:text-red-900"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
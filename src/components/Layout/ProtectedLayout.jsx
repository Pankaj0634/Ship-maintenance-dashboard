// components/Layout/ProtectedLayout.jsx - Layout for authenticated pages
import React, { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../Navigation/Navbar';

const ProtectedLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
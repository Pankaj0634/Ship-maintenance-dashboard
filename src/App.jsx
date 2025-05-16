// App.jsx - Main Application Component
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProviders } from './providers.jsx';

// Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShipsPage from './pages/ShipsPage';
import ShipDetailPage from './pages/ShipDetailPage';
import JobsPage from './pages/JobsPage';
import CalendarPage from './pages/CalendarPage';

// Components
import ProtectedLayout from './components/Layout/ProtectedLayout';
import { initializeMockData } from './utils/initializeMockData';
import ShipForm from './components/forms/ShipForm';

function App() {
  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <Router>
      <AppProviders>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="ships" element={<ShipsPage />} />
            <Route path="ships/new" element={<ShipForm />} />
            <Route path="ships/:id" element={<ShipDetailPage />} />
            <Route path="jobs" element={<JobsPage />} />
            <Route path="calendar" element={<CalendarPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppProviders>
    </Router>
  );
}

export default App;
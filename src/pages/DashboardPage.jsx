// pages/DashboardPage.jsx - Dashboard Page Component
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import KPICards from '../components/Dashboard/KPICards';
import Charts from '../components/Dashboard/Charts';
import RecentJobsTable from '../components/Dashboard/RecentJobsTable';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalShips: 0,
    overdueComponents: 0,
    jobsInProgress: 0,
    completedJobs: 0,
  });

  const [recentJobs, setRecentJobs] = useState([]);

  useEffect(() => {
    // Load ships
    const ships = JSON.parse(localStorage.getItem('ships')) || [];
    
    // Load components
    const components = JSON.parse(localStorage.getItem('components')) || [];
    
    // Load jobs
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    // Calculate stats
    const overdueComponents = components.filter(comp => {
      const lastMaintenance = new Date(comp.lastMaintenanceDate);
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return lastMaintenance < threeMonthsAgo;
    }).length;

    const jobsInProgress = jobs.filter(job => job.status === 'In Progress').length;
    const completedJobs = jobs.filter(job => job.status === 'Completed').length;

    setStats({
      totalShips: ships.length,
      overdueComponents,
      jobsInProgress,
      completedJobs,
    });

    // Get recent jobs
    const sortedJobs = [...jobs]
      .sort((a, b) => new Date(b.scheduledDate) - new Date(a.scheduledDate))
      .slice(0, 5);
    setRecentJobs(sortedJobs);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Dashboard</h1>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">
            Welcome back, <span className="font-medium">{user?.role}</span> <span className="font-semibold">{user?.email.split('@')[0]}</span>
          </p>
        </div>
      </div>
      
      {/* KPI Cards */}
      <KPICards stats={stats} />
      
      {/* Charts */}
      <Charts />
      
      {/* Recent Jobs Table */}
      <RecentJobsTable recentJobs={recentJobs} />

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="space-y-4">
          <Link 
            to="/ships/new" 
            className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Add New Ship
          </Link>
          <Link 
            to="/jobs/new" 
            className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            Create Maintenance Job
          </Link>
          <Link 
            to="/calendar" 
            className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
          >
            View Maintenance Calendar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
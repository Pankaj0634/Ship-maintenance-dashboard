// components/Dashboard/KPICards.jsx - Dashboard KPI Cards Component
import React from 'react';

const KPICards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-4">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-medium text-gray-500">Total Ships</h2>
            <p className="text-3xl font-semibold text-gray-900">{stats.totalShips}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-medium text-gray-500">Components Needing Maintenance</h2>
            <p className="text-3xl font-semibold text-red-600">{stats.overdueComponents}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-500">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-medium text-gray-500">Jobs in Progress</h2>
            <p className="text-3xl font-semibold text-blue-600">{stats.jobsInProgress}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="ml-4">
            <h2 className="text-sm font-medium text-gray-500">Completed Jobs</h2>
            <p className="text-3xl font-semibold text-green-600">{stats.completedJobs}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICards;
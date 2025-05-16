// components/Dashboard/RecentJobsTable.jsx - Recent Jobs Table Component
import React from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../../contexts/JobsContext';
import { useShips } from '../../contexts/ShipsContext';
import { useComponents } from '../../contexts/ComponentsContext';

const RecentJobsTable = () => {
  const { jobs } = useJobs();
  const { ships } = useShips();
  const { components } = useComponents();
  
  // Get most recent jobs
  const recentJobs = [...jobs]
    .sort((a, b) => new Date(b.scheduledDate) - new Date(a.scheduledDate))
    .slice(0, 5);
  
  // Helper functions to get ship and component names
  const getShipName = (shipId) => {
    const ship = ships.find(s => s.id === shipId);
    return ship ? ship.name : 'Unknown Ship';
  };
  
  const getComponentName = (componentId) => {
    const component = components.find(c => c.id === componentId);
    return component ? component.name : 'Unknown Component';
  };
  
  // Get status badge class based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge-green';
      case 'In Progress':
        return 'badge-yellow';
      case 'Cancelled':
        return 'badge-gray';
      default:
        return 'badge-blue';
    }
  };
  
  // Get priority badge class based on priority
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'badge-red';
      case 'Medium':
        return 'badge-yellow';
      case 'Low':
        return 'badge-green';
      default:
        return 'badge-blue';
    }
  };

  return (
    <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Maintenance Jobs</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ship
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Component
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scheduled Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentJobs.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  No jobs found
                </td>
              </tr>
            ) : (
              recentJobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {job.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link to={`/ships/${job.shipId}`} className="text-blue-600 hover:text-blue-900">
                      {getShipName(job.shipId)}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getComponentName(job.componentId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`badge ${getStatusBadgeClass(job.status)}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`badge ${getPriorityBadgeClass(job.priority)}`}>
                      {job.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(job.scheduledDate).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {recentJobs.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <Link 
            to="/jobs" 
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all jobs
          </Link>
        </div>
      )}
    </div>
  );
};

export default RecentJobsTable;
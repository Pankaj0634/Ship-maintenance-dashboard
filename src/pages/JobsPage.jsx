// pages/JobsPage.jsx - Jobs Page Component
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../contexts/JobsContext';
import { useShips } from '../contexts/ShipsContext';
import { useComponents } from '../contexts/ComponentsContext';
import { useAuth } from '../contexts/AuthContext';
import { hasPermission } from '../utils/roleUtils';
import DeleteConfirmationModal from '../components/common/DeleteConfirmationModal';

const JobsPage = () => {
  const { jobs, updateJob, deleteJob } = useJobs();
  const { ships } = useShips();
  const { components } = useComponents();
  const { user } = useAuth();
  
  const [filters, setFilters] = useState({
    shipId: '',
    status: '',
    priority: ''
  });
  const [sortBy, setSortBy] = useState('scheduledDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Check permissions
  const canUpdateJob = hasPermission(user?.role, ['Admin', 'Inspector', 'Engineer']);
  const canDeleteJob = hasPermission(user?.role, ['Admin']);
  
  // Apply filters and sorting
  const filteredJobs = jobs.filter(job => {
    // Apply shipId filter
    if (filters.shipId && job.shipId !== filters.shipId) {
      return false;
    }
    
    // Apply status filter
    if (filters.status && job.status !== filters.status) {
      return false;
    }
    
    // Apply priority filter
    if (filters.priority && job.priority !== filters.priority) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Apply sorting
    if (sortBy === 'scheduledDate') {
      return sortOrder === 'asc' 
        ? new Date(a.scheduledDate) - new Date(b.scheduledDate)
        : new Date(b.scheduledDate) - new Date(a.scheduledDate);
    } else if (sortBy === 'priority') {
      const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
      return sortOrder === 'asc'
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };
  
  const handleStatusChange = (jobId, newStatus) => {
    updateJob(jobId, { status: newStatus });
  };
  
  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setShowDeleteConfirm(true);
  };
  
  const confirmDelete = () => {
    if (jobToDelete) {
      deleteJob(jobToDelete.id);
      setShowDeleteConfirm(false);
      setJobToDelete(null);
    }
  };
  
  // Helper functions to get names
  const getShipName = (shipId) => {
    const ship = ships.find(s => s.id === shipId);
    return ship ? ship.name : 'Unknown Ship';
  };
  
  const getComponentName = (componentId) => {
    const component = components.find(c => c.id === componentId);
    return component ? component.name : 'Unknown Component';
  };
  
  const getEngineerName = (engineerId) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const engineer = users.find(u => u.id === engineerId);
    return engineer ? engineer.email : 'Unassigned';
  };
  
  // Badge helpers
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Maintenance Jobs</h1>
        <Link
          to="/calendar"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          View Calendar
        </Link>
      </div>
      
      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="shipId">
              Filter by Ship
            </label>
            <select
              id="shipId"
              name="shipId"
              value={filters.shipId}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Ships</option>
              {ships.map(ship => (
                <option key={ship.id} value={ship.id}>
                  {ship.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="status">
              Filter by Status
            </label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="priority">
              Filter by Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="sortBy">
              Sort By
            </label>
            <div className="flex space-x-2">
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="scheduledDate">Scheduled Date</option>
                <option value="priority">Priority</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                aria-label={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
              >
                {sortOrder === 'asc' ? (
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Jobs Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSortChange('priority')}>
                  <div className="flex items-center">
                    Priority
                    {sortBy === 'priority' && (
                      <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
                          sortOrder === 'asc' 
                            ? "M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                            : "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                        } />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSortChange('scheduledDate')}>
                  <div className="flex items-center">
                    Scheduled Date
                    {sortBy === 'scheduledDate' && (
                      <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={
                          sortOrder === 'asc' 
                            ? "M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                            : "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                        } />
                      </svg>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                    No jobs found
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      {canUpdateJob ? (
                        <select
                          value={job.status}
                          onChange={(e) => handleStatusChange(job.id, e.target.value)}
                          className={`px-2 py-1 text-xs font-semibold rounded-full border ${
                            job.status === 'Completed' ? 'border-green-500 text-green-800 bg-green-100' : 
                            job.status === 'In Progress' ? 'border-yellow-500 text-yellow-800 bg-yellow-100' : 
                            job.status === 'Cancelled' ? 'border-gray-500 text-gray-800 bg-gray-100' : 
                            'border-blue-500 text-blue-800 bg-blue-100'
                          }`}
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span className={`badge ${getStatusBadgeClass(job.status)}`}>
                          {job.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${getPriorityBadgeClass(job.priority)}`}>
                        {job.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getEngineerName(job.assignedEngineerId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(job.scheduledDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {canDeleteJob && (
                          <button
                            onClick={() => handleDeleteClick(job)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        itemName={`${getComponentName(jobToDelete?.componentId)} ${jobToDelete?.type} job`}
        itemType="this maintenance job"
      />
    </div>
  );
};

export default JobsPage;
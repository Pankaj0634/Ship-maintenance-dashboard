// contexts/JobsContext.jsx - Jobs Management Context Provider
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNotifications } from './NotificationsContext';

// Create the Jobs Context
const JobsContext = createContext();

// Custom hook for using the Jobs Context
export const useJobs = () => useContext(JobsContext);

// Jobs Provider Component
export const JobsProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  // Initialize jobs from localStorage on component mount
  useEffect(() => {
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    } else {
      // If no jobs in localStorage, use defaults from mock data
      const mockJobs = [
        { id: 'j1', componentId: 'c1', shipId: 's1', type: 'Inspection', priority: 'High', 
          status: 'Open', assignedEngineerId: '3', scheduledDate: '2025-05-05' }
      ];
      setJobs(mockJobs);
      localStorage.setItem('jobs', JSON.stringify(mockJobs));
    }
    setLoading(false);
  }, []);

  // Update localStorage whenever jobs change
  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }, [jobs]);

  // Add a new job
  const addJob = (job) => {
    const newJob = { ...job, id: `j${Date.now()}` };
    setJobs(prev => [...prev, newJob]);
    addNotification({
      type: 'success',
      message: `Job for ${job.type} has been created`,
    });
    return newJob;
  };

  // Update an existing job
  const updateJob = (id, updatedJob) => {
    setJobs(prev => prev.map(job => 
      job.id === id ? { ...job, ...updatedJob } : job
    ));
    
    // Only add notification for status changes
    if (updatedJob.status) {
      addNotification({
        type: 'info',
        message: `Job status updated to ${updatedJob.status}`,
      });
    }
  };

  // Delete a job
  const deleteJob = (id) => {
    setJobs(prev => prev.filter(job => job.id !== id));
    addNotification({
      type: 'warning',
      message: `Job has been deleted`,
    });
  };

  // Get a job by ID
  const getJob = (id) => jobs.find(job => job.id === id);

  // Get jobs for a specific ship
  const getShipJobs = (shipId) => jobs.filter(job => job.shipId === shipId);

  // Get jobs for a specific component
  const getComponentJobs = (componentId) => jobs.filter(job => job.componentId === componentId);

  // Get jobs scheduled for a specific date
  const getJobsForDate = (date) => {
    const targetDate = new Date(date);
    const targetDateString = targetDate.toISOString().split('T')[0];
    
    return jobs.filter(job => {
      const jobDate = new Date(job.scheduledDate);
      const jobDateString = jobDate.toISOString().split('T')[0];
      return jobDateString === targetDateString;
    });
  };

  // Get job statistics
  const getJobStats = () => {
    const inProgress = jobs.filter(job => job.status === 'In Progress').length;
    const completed = jobs.filter(job => job.status === 'Completed').length;
    const open = jobs.filter(job => job.status === 'Open').length;
    
    return { inProgress, completed, open };
  };

  // Create a value object to provide to consumers
  const value = {
    jobs,
    loading,
    addJob,
    updateJob,
    deleteJob,
    getJob,
    getShipJobs,
    getComponentJobs,
    getJobsForDate,
    getJobStats
  };

  return (
    <JobsContext.Provider value={value}>
      {children}
    </JobsContext.Provider>
  );
};

export default JobsContext;
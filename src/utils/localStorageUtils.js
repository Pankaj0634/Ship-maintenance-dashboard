// utils/localStorageUtils.js - Local Storage Initialization and Helpers
const JOBS_KEY_PREFIX = 'ship_jobs_';

export const initializeLocalStorage = () => {
  // Initialize users if not present
  if (!localStorage.getItem('users')) {
    const users = [
      { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
      { id: '2', role: 'Inspector', email: 'inspector@entnt.in', password: 'inspect123' },
      { id: '3', role: 'Engineer', email: 'engineer@entnt.in', password: 'engine123' }
    ];
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  // Initialize ships if not present
  if (!localStorage.getItem('ships')) {
    const ships = [
      { id: 's1', name: 'Ever Given', imo: '9811000', flag: 'Panama', status: 'Active' },
      { id: 's2', name: 'Maersk Alabama', imo: '9164263', flag: 'USA', status: 'Under Maintenance' }
    ];
    localStorage.setItem('ships', JSON.stringify(ships));
  }
  
  // Initialize components if not present
  if (!localStorage.getItem('components')) {
    const components = [
      { id: 'c1', shipId: 's1', name: 'Main Engine', serialNumber: 'ME-1234', 
        installDate: '2020-01-10', lastMaintenanceDate: '2024-03-12' },
      { id: 'c2', shipId: 's2', name: 'Radar', serialNumber: 'RAD-5678', 
        installDate: '2021-07-18', lastMaintenanceDate: '2023-12-01' }
    ];
    localStorage.setItem('components', JSON.stringify(components));
  }
  
  // Initialize jobs if not present
  if (!localStorage.getItem('jobs')) {
    const jobs = [
      { id: 'j1', componentId: 'c1', shipId: 's1', type: 'Inspection', priority: 'High', 
        status: 'Open', assignedEngineerId: '3', scheduledDate: '2025-05-05' }
    ];
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }
  
  // Initialize notifications if not present
  if (!localStorage.getItem('notifications')) {
    const notifications = [];
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }
};

// Get item from localStorage with error handling
export const getFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting item from localStorage: ${error}`);
    return defaultValue;
  }
};

// Set item in localStorage with error handling
export const setInStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item in localStorage: ${error}`);
    return false;
  }
};

// Remove item from localStorage with error handling
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item from localStorage: ${error}`);
    return false;
  }
};

// Clear all localStorage with error handling
export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`);
    return false;
  }
};

const SHIP_JOBS_KEY = 'ship_jobs_';

export const fetchJobsFromLocalStorage = (shipId) => {
  try {
    const key = `${SHIP_JOBS_KEY}${shipId}`;
    const storedJobs = localStorage.getItem(key);
    return storedJobs ? JSON.parse(storedJobs) : [];
  } catch (error) {
    console.error('Error fetching jobs from localStorage:', error);
    return [];
  }
};

export const saveJobsToLocalStorage = (shipId, jobs) => {
  try {
    const key = `${SHIP_JOBS_KEY}${shipId}`;
    localStorage.setItem(key, JSON.stringify(jobs));
    return true;
  } catch (error) {
    console.error('Error saving jobs to localStorage:', error);
    return false;
  }
};

export const getAllJobs = () => {
  try {
    const allJobs = [];
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(SHIP_JOBS_KEY)) {
        const jobs = JSON.parse(localStorage.getItem(key));
        allJobs.push(...jobs);
      }
    });
    return allJobs;
  } catch (error) {
    console.error('Error fetching all jobs:', error);
    return [];
  }
};

export const deleteJob = (shipId, jobId) => {
  try {
    const jobs = fetchJobsFromLocalStorage(shipId);
    const updatedJobs = jobs.filter(job => job.id !== jobId);
    saveJobsToLocalStorage(shipId, updatedJobs);
    return true;
  } catch (error) {
    console.error('Error deleting job:', error);
    return false;
  }
};
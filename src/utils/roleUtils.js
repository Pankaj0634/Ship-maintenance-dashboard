// utils/roleUtils.js - Role-based Permission Helpers
// Define roles
export const ROLES = {
  ADMIN: 'Admin',
  INSPECTOR: 'Inspector',
  ENGINEER: 'Engineer'
};

// Define permissions for each entity and operation
export const permissions = {
  ships: {
    create: [ROLES.ADMIN],
    update: [ROLES.ADMIN, ROLES.INSPECTOR],
    delete: [ROLES.ADMIN],
    view: [ROLES.ADMIN, ROLES.INSPECTOR, ROLES.ENGINEER]
  },
  components: {
    create: [ROLES.ADMIN, ROLES.INSPECTOR],
    update: [ROLES.ADMIN, ROLES.INSPECTOR],
    delete: [ROLES.ADMIN],
    view: [ROLES.ADMIN, ROLES.INSPECTOR, ROLES.ENGINEER]
  },
  jobs: {
    create: [ROLES.ADMIN, ROLES.INSPECTOR],
    update: [ROLES.ADMIN, ROLES.INSPECTOR, ROLES.ENGINEER],
    assignJob: [ROLES.ADMIN, ROLES.INSPECTOR],
    updateStatus: [ROLES.ADMIN, ROLES.INSPECTOR, ROLES.ENGINEER],
    delete: [ROLES.ADMIN],
    view: [ROLES.ADMIN, ROLES.INSPECTOR, ROLES.ENGINEER]
  }
};

/**
 * Check if a user has permission for a specific action
 * @param {string} userRole - The role of the user
 * @param {Array} requiredRoles - Array of roles that have permission
 * @returns {boolean} - Whether the user has permission
 */
export const hasPermission = (userRole, requiredRoles = []) => {
  if (requiredRoles.length === 0) return true;
  return requiredRoles.includes(userRole);
};

/**
 * Get allowed actions for a user role
 * @param {string} userRole - The role of the user
 * @returns {Object} - Object containing permissions for the user
 */
export const getAllowedActions = (userRole) => {
  const allowedActions = {};
  
  // Iterate through all entity types
  Object.keys(permissions).forEach(entityType => {
    allowedActions[entityType] = {};
    
    // Iterate through all action types for this entity
    Object.keys(permissions[entityType]).forEach(actionType => {
      // Check if the user role is in the list of allowed roles for this action
      allowedActions[entityType][actionType] = 
        permissions[entityType][actionType].includes(userRole);
    });
  });
  
  return allowedActions;
};

/**
 * Format role name for display
 * @param {string} role - The role to format
 * @returns {string} - Formatted role name
 */
export const formatRoleName = (role) => {
  switch (role) {
    case ROLES.ADMIN:
      return 'Administrator';
    case ROLES.INSPECTOR:
      return 'Ship Inspector';
    case ROLES.ENGINEER:
      return 'Maintenance Engineer';
    default:
      return role;
  }
};

// Get component name from ID
export const getComponentName = (componentId) => {
  // In a real app, this would fetch from an API/database
  const components = JSON.parse(localStorage.getItem('components') || '[]');
  const component = components.find(c => c.id === componentId);
  return component ? component.name : 'Unknown Component';
};

// Get engineer name from ID
export const getEngineerName = (engineerId) => {
  // In a real app, this would fetch from an API/database
  const engineers = {
    '1': 'John Smith',
    '2': 'Jane Doe',
    '3': 'Bob Wilson'
  };
  return engineers[engineerId] || 'Unassigned';
};

// Get CSS class for status badge
export const getStatusBadgeClass = (status) => {
  const statusClasses = {
    'Open': 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };
  return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

// Get CSS class for priority badge
export const getPriorityBadgeClass = (priority) => {
  const priorityClasses = {
    'High': 'bg-red-100 text-red-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Low': 'bg-green-100 text-green-800'
  };
  return priorityClasses[priority] || 'bg-gray-100 text-gray-800';
};
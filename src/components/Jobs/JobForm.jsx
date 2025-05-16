// components/Jobs/JobForm.jsx - Job Form Component
import React, { useState, useEffect } from 'react';
import { useComponents } from '../../contexts/ComponentsContext';

const JobForm = ({ isOpen, onClose, initialData, shipId, componentId, onSubmit }) => {
  const { components } = useComponents();
  const [formData, setFormData] = useState({
    type: '',
    priority: 'Medium',
    status: 'Open',
    assignedEngineerId: '',
    scheduledDate: '',
    componentId: componentId || '',
    shipId: shipId
  });
  const [errors, setErrors] = useState({});

  // Filter components for current ship if no specific component is provided
  const shipComponents = componentId 
    ? components.filter(c => c.id === componentId)
    : components.filter(c => c.shipId === shipId);

  // Get all engineer users for assignment
  const engineers = JSON.parse(localStorage.getItem('users') || '[]')
    .filter(u => u.role === 'Engineer');

  // Initialize form with data if editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form for new job
      setFormData({
        type: '',
        priority: 'Medium',
        status: 'Open',
        assignedEngineerId: '',
        scheduledDate: new Date().toISOString().split('T')[0],
        componentId: componentId || '',
        shipId: shipId
      });
    }
    // Clear any previous errors
    setErrors({});
  }, [initialData, shipId, componentId, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when it's being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields
    if (!formData.type.trim()) {
      newErrors.type = 'Job type is required';
    }
    
    if (!formData.componentId) {
      newErrors.componentId = 'Component is required';
    }
    
    if (!formData.assignedEngineerId) {
      newErrors.assignedEngineerId = 'Assigned engineer is required';
    }
    
    if (!formData.scheduledDate) {
      newErrors.scheduledDate = 'Scheduled date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative p-8 bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-2xl font-bold mb-6">{initialData ? 'Edit Maintenance Job' : 'Create Maintenance Job'}</h2>
        
        <form onSubmit={handleSubmit}>
          {!componentId && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="componentId">
                Component
              </label>
              <select
                id="componentId"
                name="componentId"
                value={formData.componentId}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.componentId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a component</option>
                {shipComponents.map(component => (
                  <option key={component.id} value={component.id}>
                    {component.name} ({component.serialNumber})
                  </option>
                ))}
              </select>
              {errors.componentId && (
                <p className="mt-1 text-xs text-red-500">{errors.componentId}</p>
              )}
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
              Job Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.type ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select job type</option>
              <option value="Inspection">Inspection</option>
              <option value="Repair">Repair</option>
              <option value="Replacement">Replacement</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Upgrade">Upgrade</option>
              <option value="Certification">Certification</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-xs text-red-500">{errors.type}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="assignedEngineerId">
              Assigned Engineer
            </label>
            <select
              id="assignedEngineerId"
              name="assignedEngineerId"
              value={formData.assignedEngineerId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.assignedEngineerId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select an engineer</option>
              {engineers.map(engineer => (
                <option key={engineer.id} value={engineer.id}>
                  {engineer.email}
                </option>
              ))}
            </select>
            {errors.assignedEngineerId && (
              <p className="mt-1 text-xs text-red-500">{errors.assignedEngineerId}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="scheduledDate">
              Scheduled Date
            </label>
            <input
              id="scheduledDate"
              name="scheduledDate"
              type="date"
              value={formData.scheduledDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.scheduledDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.scheduledDate && (
              <p className="mt-1 text-xs text-red-500">{errors.scheduledDate}</p>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {initialData ? 'Update Job' : 'Create Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
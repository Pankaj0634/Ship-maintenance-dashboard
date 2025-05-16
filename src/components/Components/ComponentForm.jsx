// components/Components/ComponentForm.jsx - Component Form Component
import React, { useState, useEffect } from 'react';

const ComponentForm = ({ isOpen, onClose, initialData, shipId, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    installDate: '',
    lastMaintenanceDate: '',
    shipId: shipId
  });
  const [errors, setErrors] = useState({});

  // Initialize form with data if editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form for new component
      setFormData({
        name: '',
        serialNumber: '',
        installDate: new Date().toISOString().split('T')[0],
        lastMaintenanceDate: new Date().toISOString().split('T')[0],
        shipId: shipId
      });
    }
    // Clear any previous errors
    setErrors({});
  }, [initialData, shipId, isOpen]);

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
    if (!formData.name.trim()) {
      newErrors.name = 'Component name is required';
    }
    
    if (!formData.serialNumber.trim()) {
      newErrors.serialNumber = 'Serial number is required';
    }
    
    if (!formData.installDate) {
      newErrors.installDate = 'Installation date is required';
    }
    
    if (!formData.lastMaintenanceDate) {
      newErrors.lastMaintenanceDate = 'Last maintenance date is required';
    } else if (new Date(formData.lastMaintenanceDate) < new Date(formData.installDate)) {
      newErrors.lastMaintenanceDate = 'Last maintenance date cannot be before installation date';
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
        
        <h2 className="text-2xl font-bold mb-6">{initialData ? 'Edit Component' : 'Add New Component'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Component Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serialNumber">
              Serial Number
            </label>
            <input
              id="serialNumber"
              name="serialNumber"
              type="text"
              value={formData.serialNumber}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.serialNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.serialNumber && (
              <p className="mt-1 text-xs text-red-500">{errors.serialNumber}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="installDate">
              Installation Date
            </label>
            <input
              id="installDate"
              name="installDate"
              type="date"
              value={formData.installDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.installDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.installDate && (
              <p className="mt-1 text-xs text-red-500">{errors.installDate}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastMaintenanceDate">
              Last Maintenance Date
            </label>
            <input
              id="lastMaintenanceDate"
              name="lastMaintenanceDate"
              type="date"
              value={formData.lastMaintenanceDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.lastMaintenanceDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.lastMaintenanceDate && (
              <p className="mt-1 text-xs text-red-500">{errors.lastMaintenanceDate}</p>
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
              {initialData ? 'Update Component' : 'Add Component'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComponentForm;
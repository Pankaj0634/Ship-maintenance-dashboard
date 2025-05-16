// components/Ships/ShipForm.jsx - Ship Form Component
import React, { useState, useEffect } from 'react';

const ShipForm = ({ isOpen, onClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    imo: '',
    flag: '',
    status: 'Active'
  });
  const [errors, setErrors] = useState({});

  // Initialize form with data if editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset form for new ship
      setFormData({
        name: '',
        imo: '',
        flag: '',
        status: 'Active'
      });
    }
    // Clear any previous errors
    setErrors({});
  }, [initialData, isOpen]);

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
      newErrors.name = 'Ship name is required';
    }
    
    // Validate IMO number (7 digits)
    if (!formData.imo.trim()) {
      newErrors.imo = 'IMO number is required';
    } else if (!/^\d{7}$/.test(formData.imo)) {
      newErrors.imo = 'IMO number must be 7 digits';
    }
    
    // Validate flag
    if (!formData.flag.trim()) {
      newErrors.flag = 'Flag is required';
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
        
        <h2 className="text-2xl font-bold mb-6">{initialData ? 'Edit Ship' : 'Add New Ship'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Ship Name
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imo">
              IMO Number
            </label>
            <input
              id="imo"
              name="imo"
              type="text"
              value={formData.imo}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.imo ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.imo ? (
              <p className="mt-1 text-xs text-red-500">{errors.imo}</p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">IMO number must be 7 digits</p>
            )}
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="flag">
              Flag
            </label>
            <input
              id="flag"
              name="flag"
              type="text"
              value={formData.flag}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.flag ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.flag && (
              <p className="mt-1 text-xs text-red-500">{errors.flag}</p>
            )}
          </div>
          
          <div className="mb-6">
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
              <option value="Active">Active</option>
              <option value="Under Maintenance">Under Maintenance</option>
              <option value="Inactive">Inactive</option>
              <option value="Decommissioned">Decommissioned</option>
            </select>
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
              {initialData ? 'Update Ship' : 'Add Ship'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipForm;
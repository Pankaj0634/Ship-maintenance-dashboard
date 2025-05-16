import React, { useState, useEffect } from 'react';

const ComponentForm = ({ isOpen, onClose, initialData, shipId, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    serialNumber: '',
    installDate: '',
    lastMaintenanceDate: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        serialNumber: initialData.serialNumber || '',
        installDate: initialData.installDate || '',
        lastMaintenanceDate: initialData.lastMaintenanceDate || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: initialData?.id || `comp-${Date.now()}`,
      shipId
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {initialData ? 'Edit Component' : 'Add New Component'}
          </h3>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Component Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Serial Number
              </label>
              <input
                type="text"
                value={formData.serialNumber}
                onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Installation Date
              </label>
              <input
                type="date"
                value={formData.installDate}
                onChange={(e) => setFormData({...formData, installDate: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Maintenance Date
              </label>
              <input
                type="date"
                value={formData.lastMaintenanceDate}
                onChange={(e) => setFormData({...formData, lastMaintenanceDate: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {initialData ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComponentForm;
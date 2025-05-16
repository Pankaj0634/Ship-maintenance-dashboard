import React, { useState, useEffect } from 'react';

const JobForm = ({ isOpen, onClose, initialData, shipId, componentId, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: '',
    priority: 'Low',
    status: 'Open',
    assignedEngineerId: '',
    scheduledDate: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type || '',
        priority: initialData.priority || 'Low',
        status: initialData.status || 'Open',
        assignedEngineerId: initialData.assignedEngineerId || '',
        scheduledDate: initialData.scheduledDate || '',
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: initialData?.id || `job-${Date.now()}`,
      shipId,
      componentId,
      createdAt: initialData?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 text-center mb-4">
            {initialData ? 'Edit Maintenance Job' : 'Create New Job'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Job Type
              </label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                required
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Assigned Engineer
              </label>
              <select
                value={formData.assignedEngineerId}
                onChange={(e) => setFormData({...formData, assignedEngineerId: e.target.value})}
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                required
              >
                <option value="">Select Engineer</option>
                <option value="1">John Smith</option>
                <option value="2">Jane Doe</option>
                <option value="3">Bob Wilson</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Scheduled Date
              </label>
              <input
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                rows="3"
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
                {initialData ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
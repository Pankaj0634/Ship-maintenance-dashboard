import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ShipForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    imo: '',
    flag: '',
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const ships = JSON.parse(localStorage.getItem('ships') || '[]');
    const newShip = {
      id: `s${Date.now()}`,
      ...formData
    };
    
    ships.push(newShip);
    localStorage.setItem('ships', JSON.stringify(ships));
    navigate('/ships');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Ship</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Ship Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">IMO Number</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.imo}
            onChange={(e) => setFormData({...formData, imo: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Flag</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.flag}
            onChange={(e) => setFormData({...formData, flag: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="Active">Active</option>
            <option value="Under Maintenance">Under Maintenance</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/ships')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            Add Ship
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShipForm;
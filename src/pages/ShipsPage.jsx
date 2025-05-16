// pages/ShipsPage.jsx - Ships Page Component
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShips } from '../contexts/ShipsContext';
import { useAuth } from '../contexts/AuthContext';
import { hasPermission } from '../utils/roleUtils';
import ShipForm from '../components/Ships/ShipForm';
import DeleteConfirmationModal from '../components/common/DeleteConfirmationModal';

const ShipsPage = () => {
  const { ships, loading, addShip, updateShip, deleteShip } = useShips();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentShip, setCurrentShip] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [shipToDelete, setShipToDelete] = useState(null);
  
  // Check permissions
  const canCreate = hasPermission(user?.role, ['Admin']);
  const canUpdate = hasPermission(user?.role, ['Admin', 'Inspector']);
  const canDelete = hasPermission(user?.role, ['Admin']);
  
  // Filter ships based on search term
  const filteredShips = ships.filter(ship => 
    ship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ship.imo.includes(searchTerm) ||
    ship.flag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ship.status.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handlers
  const handleAddShip = (shipData) => {
    addShip(shipData);
    setShowForm(false);
  };
  
  const handleUpdateShip = (shipData) => {
    updateShip(currentShip.id, shipData);
    setCurrentShip(null);
    setShowForm(false);
  };
  
  const handleDeleteClick = (ship) => {
    setShipToDelete(ship);
    setShowDeleteConfirm(true);
  };
  
  const confirmDelete = () => {
    if (shipToDelete) {
      deleteShip(shipToDelete.id);
      setShowDeleteConfirm(false);
      setShipToDelete(null);
    }
  };

  // Status badge class helper
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active':
        return 'badge-green';
      case 'Under Maintenance':
        return 'badge-yellow';
      case 'Inactive':
        return 'badge-gray';
      case 'Decommissioned':
        return 'badge-red';
      default:
        return 'badge-blue';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Ships Management</h1>
        {canCreate && (
          <button
            onClick={() => {
              setCurrentShip(null);
              setShowForm(true);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add New Ship
          </button>
        )}
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search ships..."
          />
        </div>
      </div>
      
      {/* Ships Table */}
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ship Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IMO Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Flag
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredShips.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No ships found
                  </td>
                </tr>
              ) : (
                filteredShips.map((ship) => (
                  <tr key={ship.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        to={`/ships/${ship.id}`}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        {ship.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ship.imo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {ship.flag}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`badge ${getStatusBadgeClass(ship.status)}`}>
                        {ship.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link
                          to={`/ships/${ship.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        {canUpdate && (
                          <button
                            onClick={() => {
                              setCurrentShip(ship);
                              setShowForm(true);
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                        )}
                        {canDelete && (
                          <button
                            onClick={() => handleDeleteClick(ship)}
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
      
      {/* Ship Form Modal */}
      <ShipForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setCurrentShip(null);
        }}
        initialData={currentShip}
        onSubmit={currentShip ? handleUpdateShip : handleAddShip}
      />
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        itemName={shipToDelete?.name}
        itemType="the ship"
      />
    </div>
  );
};

export default ShipsPage;
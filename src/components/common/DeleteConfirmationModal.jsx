// components/common/DeleteConfirmationModal.jsx - Reusable Delete Confirmation Modal
import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName, itemType }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative p-8 bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-6">
          Are you sure you want to delete {itemType} "{itemName}"?
          <br />
          This action cannot be undone.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
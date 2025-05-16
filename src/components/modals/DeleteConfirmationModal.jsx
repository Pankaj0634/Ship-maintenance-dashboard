import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemName, itemType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Confirm Deletion
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete {itemType} "{itemName}"? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end space-x-3 px-4 py-3">
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
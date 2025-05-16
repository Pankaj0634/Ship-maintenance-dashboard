import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getComponentName, getEngineerName, getStatusBadgeClass, getPriorityBadgeClass } from '../utils/roleUtils';
import { fetchJobsFromLocalStorage, saveJobsToLocalStorage } from '../utils/localStorageUtils';
import ComponentForm from '../components/forms/ComponentForm';
import JobForm from '../components/forms/JobForm';
import DeleteConfirmationModal from '../components/modals/DeleteConfirmationModal';


const ShipDetailPage = ({ id }) => {
  const { user } = useContext(AuthContext);
  const [shipJobs, setShipJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showComponentForm, setShowComponentForm] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(null);

  const [showJobForm, setShowJobForm] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [selectedComponentId, setSelectedComponentId] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState('');

  const canUpdateJob = user.role === 'Admin' || user.role === 'Engineer';
  const canDeleteJob = user.role === 'Admin';

  useEffect(() => {
    try {
      const jobs = fetchJobsFromLocalStorage(id);
      setShipJobs(jobs);
    } catch (err) {
      setError('Failed to load jobs.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handleDeleteJob = (job) => {
    if (!canDeleteJob) return;
    const updatedJobs = shipJobs.filter((j) => j.id !== job.id);
    setShipJobs(updatedJobs);
    saveJobsToLocalStorage(id, updatedJobs);
  };

  const confirmDelete = () => {
    if (deleteType === 'component' && itemToDelete) {
      // Handle component deletion
    } else if (deleteType === 'job' && itemToDelete) {
      handleDeleteJob(itemToDelete);
    }
    setShowDeleteConfirm(false);
    setItemToDelete(null);
    setDeleteType('');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ship Maintenance Jobs</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Job Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Component
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Scheduled Date
              </th>
              {canUpdateJob || canDeleteJob ? (
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shipJobs.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {job.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getComponentName(job.componentId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`badge ${getStatusBadgeClass(job.status)}`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`badge ${getPriorityBadgeClass(job.priority)}`}>
                    {job.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {getEngineerName(job.assignedEngineerId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(job.scheduledDate).toLocaleDateString()}
                </td>
                {canUpdateJob || canDeleteJob ? (
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {canUpdateJob && (
                        <button
                          onClick={() => {
                            setCurrentJob(job);
                            setShowJobForm(true);
                          }}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                      )}
                      {canDeleteJob && (
                        <button
                          onClick={() => handleDeleteJob(job)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Component Form Modal */}
      <ComponentForm
        isOpen={showComponentForm}
        onClose={() => {
          setShowComponentForm(false);
          setCurrentComponent(null);
        }}
        initialData={currentComponent}
        shipId={id}
        onSubmit={currentComponent ? handleUpdateComponent : handleAddComponent}
      />

      {/* Job Form Modal */}
      <JobForm
        isOpen={showJobForm}
        onClose={() => {
          setShowJobForm(false);
          setCurrentJob(null);
          setSelectedComponentId(null);
        }}
        initialData={currentJob}
        shipId={id}
        componentId={selectedComponentId}
        onSubmit={currentJob ? handleUpdateJob : handleAddJob}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setItemToDelete(null);
          setDeleteType('');
        }}
        onConfirm={confirmDelete}
        itemName={
          deleteType === 'component' 
            ? itemToDelete?.name 
            : `${getComponentName(itemToDelete?.componentId)} ${itemToDelete?.type} job`
        }
        itemType={deleteType === 'component' ? 'the component' : 'this maintenance job'}
      />
    </div>
  );
};

export default ShipDetailPage;
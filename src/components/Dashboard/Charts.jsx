// components/Dashboard/Charts.jsx - Dashboard Charts Component
import React from 'react';
import { useJobs } from '../../contexts/JobsContext';

const PriorityChart = ({ jobs }) => {
  // Count jobs by priority
  const getPriorityCount = () => {
    const counts = { 'High': 0, 'Medium': 0, 'Low': 0 };
    jobs.forEach(job => {
      if (job.priority in counts) {
        counts[job.priority]++;
      }
    });
    return counts;
  };

  const priorityCounts = getPriorityCount();
  const total = jobs.length || 1; // Avoid division by zero

  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900">Jobs by Priority</h3>
      
      <div className="mt-4 space-y-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">High Priority</span>
            <span className="text-sm font-medium text-gray-700">{priorityCounts['High']}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-red-500 h-2.5 rounded-full" 
              style={{ width: `${(priorityCounts['High'] / total * 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Medium Priority</span>
            <span className="text-sm font-medium text-gray-700">{priorityCounts['Medium']}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-yellow-500 h-2.5 rounded-full" 
              style={{ width: `${(priorityCounts['Medium'] / total * 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Low Priority</span>
            <span className="text-sm font-medium text-gray-700">{priorityCounts['Low']}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-500 h-2.5 rounded-full" 
              style={{ width: `${(priorityCounts['Low'] / total * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusChart = ({ jobs }) => {
  // Count jobs by status
  const getStatusCount = () => {
    const counts = { 'Open': 0, 'In Progress': 0, 'Completed': 0, 'Cancelled': 0 };
    jobs.forEach(job => {
      if (job.status in counts) {
        counts[job.status]++;
      }
    });
    return counts;
  };

  const statusCounts = getStatusCount();
  const total = jobs.length;
  
  // Create data for chart
  const data = [
    { name: 'Open', value: statusCounts['Open'], color: 'bg-blue-500' },
    { name: 'In Progress', value: statusCounts['In Progress'], color: 'bg-yellow-500' },
    { name: 'Completed', value: statusCounts['Completed'], color: 'bg-green-500' },
    { name: 'Cancelled', value: statusCounts['Cancelled'], color: 'bg-gray-500' }
  ].filter(item => item.value > 0); // Only include statuses with jobs

  return (
    <div className="flex flex-col p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900">Jobs by Status</h3>
      
      <div className="flex items-center justify-center mt-4">
        <div className="w-full">
          {data.map(item => (
            <div key={item.name} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                <span className="text-sm font-medium text-gray-700">
                  {item.value} ({total ? Math.round((item.value / total) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`${item.color.replace('bg-', 'bg-')} h-2.5 rounded-full`} 
                  style={{ width: `${total ? (item.value / total * 100) : 0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Charts = () => {
  const { jobs } = useJobs();
  
  return (
    <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
      <PriorityChart jobs={jobs} />
      <StatusChart jobs={jobs} />
    </div>
  );
};

export default Charts;